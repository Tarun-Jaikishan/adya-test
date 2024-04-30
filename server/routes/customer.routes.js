const express = require("express");
const router = express.Router();

const {
  listRestaurant,
  generateSlots,
  generateTables,
  bookSlot,
  bookingHistory,
  rateRestaurant,
} = require("../controllers/customer.controller");

const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

router.use(verifyAccessToken(["customer"]));

// ROUTE -> api/customer

router.route("/").get(listRestaurant);

router.route("/booking").post(bookSlot).get(bookingHistory);

router.route("/tables").get(generateTables);

router.route("/slots").post(generateSlots);

router.route("/rating").put(rateRestaurant);

module.exports = router;
