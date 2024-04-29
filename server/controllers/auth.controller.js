const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/user.model");
const { authModel } = require("../models/auth.model");

const {
  registerSchema,
  loginSchema,
} = require("../utils/schema-validators/auth.schema");

const { hashPassword } = require("../utils/hash-password");

// POST -> /api/auth/register
const register = async (req, res) => {
  try {
    const data = req.body;

    const { error, value } = registerSchema.validate(data);

    let authData = {
      username: value.username,
      password: value.password,
    };

    if (error)
      return res
        .status(400)
        .json({ error: true, message: "Invalid Register Data", err: error });

    delete value.password;
    const response = await userModel.create(value);

    if (response) {
      const hashedPassword = await hashPassword(authData.password);
      authData.password = hashedPassword;
      await authModel.create(authData);
      res.status(201).json({ error: false, message: "Account Created" });
    } else
      res.status(400).json({ error: true, message: "Something Went Wrong" });
  } catch (err) {
    // Validate Duplicates
    console.log(err);
    if (err.errorResponse.code === 11000 && err.errorResponse.keyValue.username)
      return res
        .status(409)
        .json({ error: true, message: "Username Already Exists" });
    if (
      err.errorResponse.code === 11000 &&
      err.errorResponse.keyValue.phone_number
    )
      return res
        .status(409)
        .json({ error: true, message: "Phone Number Already Exists" });
    if (err.errorResponse.code === 11000 && err.errorResponse.keyValue.email)
      return res
        .status(409)
        .json({ error: true, message: "Email Already Exists" });

    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// POST -> /api/auth/login
const login = async (req, res) => {
  try {
    const data = req.body;

    const { error, value } = loginSchema.validate(data);

    if (error)
      return res
        .status(404)
        .json({ error: true, message: "Invalid Credentials" });

    const response = await authModel.findOne({ username: value.username });

    const passwordMatch = await bcrypt.compare(
      value.password,
      response && response.password ? response.password : ""
    );

    if (!response || !passwordMatch)
      return res
        .status(404)
        .json({ error: true, message: "Invalid Credentials" });

    const userInfo = await userModel
      .findOne({ username: value.username }, { role: 1, username: 1 })
      .lean();

    const accesstoken = jwt.sign(
      { ...userInfo, access: true },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    const refreshtoken = jwt.sign(
      { ...userInfo, access: false },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).cookie("access_token", accesstoken);
    res.status(200).cookie("refresh_token", refreshtoken);
    res.status(200).json({ error: false, message: "Login Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/auth + BEARER TOKEN
const userInfo = async (req, res) => {
  try {
    const { username } = req.user;

    const response = await userModel.findOne(
      { username },
      { __v: 0, updatedAt: 0, createdAt: 0, _id: 0 }
    );

    if (!response)
      return res.status(404).json({ error: true, message: "No User Found" });

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// PUT -> /api/auth/change-password + BEARER TOKEN
const changePassword = async (req, res) => {
  try {
    const { username } = req.user;
    const { confirm_password } = req.body;

    if (!confirm_password)
      return res
        .status(400)
        .json({ error: true, message: "Please Provide Confirm Password" });

    if (confirm_password.length > 20 || confirm_password.length < 6)
      return res.status(400).json({
        error: true,
        message: "Confirm Password Length Must Be Between 6 and 20",
      });

    const hashedPassword = await hashPassword(confirm_password);

    const response = await authModel.findOneAndUpdate(
      { username },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    if (!response)
      return res
        .status(400)
        .json({ error: true, message: "Something Went Wrong" });

    res.status(200).json({ error: false, message: "Password Changed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// PUT -> /api/auth/logout + BEARER TOKEN
const logout = async (req, res) => {
  try {
    const { username } = req.user;

    const response = await userModel.findOneAndUpdate(
      { username },
      {
        $set: {
          lastLogin: Date.now(),
        },
      }
    );

    if (!response)
      return res
        .status(400)
        .json({ error: true, message: "Something Went Wrong" });

    res.status(200).json({ error: false, message: "Logout Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { register, login, userInfo, changePassword, logout };
