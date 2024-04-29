// .ENV
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const expSession = require("express-session");

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const { mongoConnect } = require("./config/mongo.config");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(
  expSession({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

// Logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// app.use(morgan("short", { stream: accessLogStream }));
app.use(morgan("short"));

// Routes

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome To Restaurant Reservation API" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await mongoConnect(process.env.DB);
    console.log("Server Running on PORT", port);
  } catch (err) {
    console.log(err);
  }
});
