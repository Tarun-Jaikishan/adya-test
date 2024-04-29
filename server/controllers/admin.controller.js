const { restaurantModel } = require("../models/restaurant.model");
const {
  restaurantSchema,
} = require("../utils/schema-validators/restaurant.schema");

// POST -> /api/admin + BEARER TOKEN
const addRestaurant = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = restaurantSchema.validate(data);

    if (error)
      return res
        .status(400)
        .json({ error: true, message: "Invalid Restaurant Data", err: error });

    const response = await restaurantModel.create(value);

    res.status(200).json({ error: false, message: "Restaurant Created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/admin + BEARER TOKEN
const listRestaurant = async (req, res) => {
  try {
    const response = await restaurantModel.find(
      {},
      { __v: 0, updatedAt: 0, table: 0 }
    );

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// DELETE -> /api/admin?id=value + BEARER TOKEN
const removeRestaurant = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await restaurantModel.findOneAndDelete({ _id: id });

    if (!response)
      return res
        .status(404)
        .json({ error: true, message: "Invalid Restaurant ID" });

    res.status(200).json({ error: false, message: "Restaurant Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// PENDING
// PUT -> /api/admin + BEARER TOKEN
const editRestaurant = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await restaurantModel.findOneAndDelete({ _id: id });

    if (!response)
      return res
        .status(404)
        .json({ error: true, message: "Invalid Restaurant ID" });

    res.status(200).json({ error: false, message: "Restaurant Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  addRestaurant,
  listRestaurant,
  removeRestaurant,
  editRestaurant,
};
