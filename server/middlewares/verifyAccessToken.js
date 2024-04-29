const jwt = require("jsonwebtoken");

const verifyAccessToken =
  (role = null) =>
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const verify = jwt.verify(token, process.env.JWT_KEY);
      if (!verify.access || (role && role !== verify.role))
        return res
          .status(403)
          .json({ error: true, message: "API Service Forbidden" });
      req.user = verify;
      next();
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  };

module.exports = { verifyAccessToken };
