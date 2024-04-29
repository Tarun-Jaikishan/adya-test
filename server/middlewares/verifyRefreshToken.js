const jwt = require("jsonwebtoken");

const verifyRefreshToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_KEY);

    if (verify.access)
      return res
        .status(403)
        .json({ error: true, message: "API Service Forbidden" });
    req.user = verify;
    next();
  } catch (err) {
    console.log(err);
    if (err.expiredAt)
      return res.status(401).json({ error: true, message: "Token Expired" });
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { verifyRefreshToken };
