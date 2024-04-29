const mongoose = require("mongoose");

const mongoConnect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { mongoConnect };
