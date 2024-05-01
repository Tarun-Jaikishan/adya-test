const { reservationModel } = require("../models/reservation.model");
const { restaurantModel } = require("../models/restaurant.model");
const {
  slotSchema,
  ratingSchema,
  reservationSchema,
} = require("../utils/schema-validators/customer.schema");

// GET -> /api/customer + BEARER TOKEN
const listRestaurant = async (req, res) => {
  try {
    const response = await restaurantModel
      .find({}, { __v: 0, updatedAt: 0 })
      .sort({ "rating.value": -1 })
      .limit(4);

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/customer/tables + BEARER TOKEN
const generateTables = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "Please Provide Restaurant ID" });

    const response = await restaurantModel.findOne({ _id: id }, { table: 1 });

    let finalArr = [];
    response.table.forEach((item) => {
      for (i = 1; i <= item.count; i++) {
        finalArr.push(`${item.tableSize}-Seater Table (${i})`);
      }
    });

    res.status(200).json({ error: false, data: finalArr });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// Issue Need to be solved which users concurrently books it will allow duplicates
// Restriction Needs to be added
// POST -> /api/customer/slots + BEARER TOKEN
const generateSlots = async (req, res) => {
  try {
    const data = req.body;

    const { error, value } = slotSchema.validate(data);

    if (error)
      return res
        .status(400)
        .json({ error: true, message: "Invalid Restaurant Data", err: error });

    const response = await restaurantModel.findOne(
      { _id: value.id },
      { timing: 1 }
    );

    let generalSlots = [];

    let from = Number(response.timing.from);
    let to = Number(response.timing.to);

    for (i = from; i <= to; i++) {
      generalSlots.push(String(i).length === 1 ? "0" + String(i) : String(i));
    }

    generalSlots = generalSlots
      .map((item, i) => {
        if (i !== generalSlots.length - 1)
          return `${generalSlots[i]}-${generalSlots[i + 1]}`;
      })
      .filter((slot) => slot != null);

    let bookings = await reservationModel.find(
      {
        restaurantId: value.id,
        dateOfBooking: value.dateOfBooking,
        tableId: value.tableId,
      },
      { slots: 1 }
    );

    if (bookings) {
      bookings = bookings.map((item) => item.slots[0]);

      bookings.forEach((item) => {
        generalSlots = generalSlots.filter((innerItem) => item !== innerItem);
      });
    }

    // if (bookings.length === 0)
    return res.status(200).json({ error: false, data: generalSlots });
    // else return res.status(200).json({ error: false, data: [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// POST -> /api/customer/booking + BEARER TOKEN
const bookSlot = async (req, res) => {
  try {
    const { username } = req.user;

    const data = req.body;

    const { error, value } = reservationSchema.validate(data);

    if (error)
      return res
        .status(400)
        .json({ error: true, message: "Invalid Reservation Data", err: error });

    value.username = username;
    value.slots = [...new Set(value.slots)];
    const response = await reservationModel.create(value);

    res.status(200).json({ error: false, message: "Reservation Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET -> /api/customer/booking + BEARER TOKEN
const bookingHistory = async (req, res) => {
  try {
    const { username } = req.user;

    // const response = await reservationModel
    //   .find({ username }, { _id: 0, updatedAt: 0, __v: 0 })
    //   .sort({ createdAt: -1 });

    const response = await reservationModel.aggregate([
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "info",
        },
      },
      {
        $project: {
          updatedAt: 0,
          __v: 0,
          "info.createdAt": 0,
          "info.updatedAt": 0,
          "info.__v": 0,
          "info.table": 0,
        },
      },
      {
        $unwind: "$info",
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({ error: false, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// PUT -> /api/customer/rating + BEARER TOKEN
const rateRestaurant = async (req, res) => {
  try {
    const data = req.body;

    const { error, value } = ratingSchema.validate(data);

    if (error)
      return res
        .status(400)
        .json({ error: true, message: "Invalid Restaurant Data", err: error });

    const response = await restaurantModel.findOne(
      { _id: value.id },
      { rating: 1 }
    );

    if (!response)
      return res
        .status(404)
        .json({ error: true, message: "Invalid Restaurant ID" });

    await restaurantModel.updateOne(
      { _id: value.id },
      {
        $set: {
          "rating.value": response.rating.value + value.rating,
          "rating.count": response.rating.count + 1,
        },
      }
    );

    res.status(200).json({ error: false, message: "Restaurant Rated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  listRestaurant,
  generateTables,
  generateSlots,
  bookSlot,
  bookingHistory,
  rateRestaurant,
};
