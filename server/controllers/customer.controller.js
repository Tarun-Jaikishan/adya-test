const { reservationModel } = require("../models/reservation.model");
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

// GET -> /api/customer/tables + BEARER TOKEN
const generateTables = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "Please Provide Restaurant ID" });

    const response = await restaurantModel.findOne({ _id: id }, { table: 1 });

    let finalArr = [];
    response.table.forEach((item) => {
      for (i = 1; i <= item.count; i++) {
        finalArr.push(`${item.tableSize}-Seater (${i})`);
      }
    });

    res.status(200).json({ error: false, data: finalArr });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/customer/slots + BEARER TOKEN
const generateSlots = async (req, res) => {
  try {
    const { id, dateOfBooking } = req.body;

    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "Please Provide Restaurant ID" });

    const response = await restaurantModel.find(
      { _id: id },
      { timing: 1, table: 1 }
    );

    const bookings = await reservationModel.find({
      restaurantId: id,
      dateOfBooking,
    });

    res.status(200).json({ error: false, data: response, bookings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { listRestaurant, generateTables, generateSlots };
