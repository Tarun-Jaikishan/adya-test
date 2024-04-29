const express = require("express");
const router = express.Router();

// ROUTE -> api/customer

router.route("/register").post(register);

module.exports = router;
