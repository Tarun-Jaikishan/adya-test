const bcrypt = require("bcrypt");

const { registerSchema } = require("../utils/auth.schema");

const { userModel } = require("../models/user.model");
const { authModel } = require("../models/auth.model");

// POST -> /api/auth/register
const register = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = registerSchema.validate(data);

    if (error)
      return res
        .status(400)
        .json({ error: true, message: "Invalid Register Data", err: error });

    delete value.password;
    const response = await userModel.create(value);

    if (response) {
      console.log(value);
      // await authModel.create()
    }

    return res.status(200).json({ value });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: true, message: "Internal Server Error", err });
  }
};

module.exports = { register };
