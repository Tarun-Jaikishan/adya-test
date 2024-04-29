const express = require("express");
const router = express.Router();

// ROUTE -> api/common

router.route("/register").post(register);

module.exports = router;
