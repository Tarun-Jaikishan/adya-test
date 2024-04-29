const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const authModel = mongoose.model("auth", authSchema);

module.exports = { authModel };
