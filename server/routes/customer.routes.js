const express = require("express");
const router = express.Router();

const { listRestaurant } = require("../controllers/customer.controller");

const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

router.use(verifyAccessToken(["customer"]));

// ROUTE -> api/customer

router.route("/").get(listRestaurant);

module.exports = router;
