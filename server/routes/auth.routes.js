const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  userInfo,
  changePassword,
} = require("../controllers/auth.controller");

const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

// ROUTE -> api/auth

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").put(verifyAccessToken(), logout);
router.route("/").get(verifyAccessToken(), userInfo);
router.route("/change-password").put(verifyAccessToken(), changePassword);

module.exports = router;
