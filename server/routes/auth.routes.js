const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  userInfo,
  changePassword,
  generateToken,
} = require("../controllers/auth.controller");

const { verifyAccessToken } = require("../middlewares/verifyAccessToken");
const { verifyRefreshToken } = require("../middlewares/verifyRefreshToken");

// ROUTE -> api/auth

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").put(verifyAccessToken(), logout);
router.route("/").get(verifyAccessToken(), userInfo);
router.route("/change-password").put(verifyAccessToken(), changePassword);
router.route("/generate-token").post(verifyRefreshToken, generateToken);

module.exports = router;
