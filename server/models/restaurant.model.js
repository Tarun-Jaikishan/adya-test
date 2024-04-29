const { Schema } = require("mongoose");

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
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = { restaurantModel };
