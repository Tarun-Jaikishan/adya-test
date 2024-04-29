const { restaurantModel } = require("../models/restaurant.model");

// GET -> /api/common/location + BEARER TOKEN
const locationData = async (req, res) => {
  try {
    const states = [
      {
        name: "TamilNadu",
        cities: ["Chennai", "Salem", "Coimbatore", "Trichy"],
      },
      {
        name: "Karnataka",
        cities: ["Bengaluru", "Mysore"],
      },
      {
        name: "Kerala",
        cities: ["Thiruvananthapuram", "Thrissur"],
      },
    ];

    res.status(200).json({ error: false, data: states });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/common/restaurant?state=value&city=value&name=value&cuisine_type=value + BEARER TOKEN
const filterRestaurant = async (req, res) => {
  try {
    const {
      state = null,
      city = null,
      name = null,
      cuisine_type = null,
    } = req.query;

    // query to fetch specified restaurants
    let query = {};
    if (name) query["name"] = name;
    if (cuisine_type) query["cuisine_type"] = cuisine_type;
    if (state) query["location.state"] = state;
    if (state && city) query["location.city"] = city;

    const response = await restaurantModel.find(query, {
      __v: 0,
      updatedAt: 0,
    });

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { locationData, filterRestaurant };
