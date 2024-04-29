const { Schema } = require("mongoose");

const ratingSchema = Schema(
  {
    ratedBy: {
      type: String,
      required: true,
    },
    value: { type: Number, required: true }, // rating value
  },
  { _id: false, timestamps: true }
);

const restaurantSchema = Schema(
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
    ratingInfo: {
      type: [ratingSchema],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = { restaurantModel };
