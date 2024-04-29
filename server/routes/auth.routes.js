const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  userInfo,
  changePassword,
} = require("../controllers/auth.controller");

// ROUTE -> api/auth

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").put(logout);
router.route("/").get(userInfo);
router.route("/change-password").get(changePassword);

module.exports = router;
