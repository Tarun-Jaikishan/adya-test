const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    slots: {
      type: [String],
      required: true,
    },
    seater: {
      type: Number,
      required: true,
    },
    tableId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reservationModel = mongoose.model("reservation", reservationSchema);

module.exports = { reservationModel };
