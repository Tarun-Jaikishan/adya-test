const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_KEY);

    return res.status(401).json({ error: "API Service Forbidden" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error", err });
  }
};

module.exports = { verifyAccessToken };
