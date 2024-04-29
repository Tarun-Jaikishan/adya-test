const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 20,
  },
});

const authModel = mongoose.model("auth", authSchema);

module.exports = { authModel };
