const express = require("express");
const router = express.Router();

const {
  locationData,
  filterRestaurant,
} = require("../controllers/common.controller");

const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

// ROUTE -> api/common

router.use(verifyAccessToken());

router.route("/location").get(locationData);
router.route("/restaurant").get(filterRestaurant);

module.exports = router;
