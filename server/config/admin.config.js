const bcrypt = require("bcrypt");

const { userModel } = require("../models/user.model");
const { authModel } = require("../models/auth.model");

async function setUpAdmin() {
  try {
    await userModel.updateOne(
      { username: "admin" },
      {
        $set: {
          name: "Admin",
          phone_number: process.env.ADMIN_PHONE,
          email: process.env.ADMIN_MAIL,
          role: "admin",
        },
      },
      { upsert: true }
    );
    const password = process.env.ADMIN_PASSWORD;
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    await authModel.updateOne(
      { username: "admin" },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { upsert: true }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { setUpAdmin };
