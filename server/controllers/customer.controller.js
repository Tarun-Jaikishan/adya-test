const { restaurantModel } = require("../models/restaurant.model");

// GET -> /api/customer + BEARER TOKEN
const listRestaurant = async (req, res) => {
  try {
    const response = await restaurantModel
      .find({}, { __v: 0, updatedAt: 0 })
      .sort({ "rating.value": 1 })
      .limit(3);

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/customer/slots + BEARER TOKEN
const generateSlots = async (req, res) => {
  try {
    const response = await restaurantModel
      .find({}, { __v: 0, updatedAt: 0 })
      .sort({ "rating.value": 1 })
      .limit(3);

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { listRestaurant, generateSlots };
