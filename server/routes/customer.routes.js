const express = require("express");
const router = express.Router();

// ROUTE -> api/customer

router.route("/").post(register);

module.exports = router;
