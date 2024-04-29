const express = require("express");
const router = express.Router();

const { locationData } = require("../controllers/common.controller");
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

// ROUTE -> api/common

router.route("/location").get(verifyAccessToken(), locationData);

module.exports = router;
