const express = require("express");
const router = express.Router();

const { register } = require("../controllers/auth.controller");

// ROUTE -> api/auth

router.route("/register").post(register);

module.exports = router;
