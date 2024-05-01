const mongoose = require("mongoose");

const slots = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

const tableSchema = mongoose.Schema(
  {
    tableSize: {
      type: Number,
      min: 2,
      required: true,
    },
    count: {
      type: Number,
      min: 2,
      required: true,
    },
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    cuisine_type: {
      type: String,
      required: true,
    },

    timing: {
      from: {
        type: String,
        enum: slots,
        message: "Invalid Slot",
        default: "00",
      },
      to: {
        type: String,
        enum: slots,
        message: "Invalid Slot",
        default: "23",
      },
    },

    location: {
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },

    table: {
      type: [tableSchema],
      default: [
        { tableSize: 2, count: 2 },
        { tableSize: 4, count: 2 },
        { tableSize: 6, count: 2 },
      ],
    },

    rating: {
      value: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = { restaurantModel };
