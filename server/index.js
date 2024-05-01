// .ENV
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expSession = require("express-session");

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const { mongoConnect } = require("./config/mongo.config");
const { setUpAdmin } = require("./config/admin.config");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://adya-tarun.netlify.app",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
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
app.use(morgan("short", { stream: accessLogStream }));

// Routes
const authRouter = require("./routes/auth.routes");
const commonRouter = require("./routes/common.routes");
const adminRouter = require("./routes/admin.routes");
const customerRouter = require("./routes/customer.routes");

app.use("/api/auth", authRouter);
app.use("/api/common", commonRouter);
app.use("/api/admin", adminRouter);
app.use("/api/customer", customerRouter);

app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .json({ error: false, message: "Welcome To Restaurant Reservation API" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await mongoConnect(process.env.DB);
    await setUpAdmin();
    console.log("Server Running on PORT", port);
  } catch (err) {
    console.log(err);
  }
});
