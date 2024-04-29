const bcrypt = require("bcrypt");

const { registerSchema } = require("../utils/schema-validators/auth.schema");

const { userModel } = require("../models/user.model");
const { authModel } = require("../models/auth.model");
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

    console.log(err);
    res
      .status(500)
      .json({ error: true, message: "Internal Server Error", err });
  }
};

module.exports = { register };
