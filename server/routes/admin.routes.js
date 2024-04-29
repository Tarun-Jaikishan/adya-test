const express = require("express");
const router = express.Router();

// ROUTE -> api/admin

router.route("/").post(register);

module.exports = router;
