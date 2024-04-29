const express = require("express");
const router = express.Router();

const {
  addRestaurant,
  listRestaurant,
  removeRestaurant,
  editRestaurant,
} = require("../controllers/admin.controller");

const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

// ROUTE -> api/admin

router.use(verifyAccessToken(["admin"]));

router
  .route("/")
  .post(addRestaurant)
  .get(listRestaurant)
  .delete(removeRestaurant)
  .put(editRestaurant);

module.exports = router;
