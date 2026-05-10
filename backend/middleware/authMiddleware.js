const jwt = require("jsonwebtoken");
const catchAsyncHandler = require("./catchAsyncHandler");
const client = require("../config/redis");

module.exports = catchAsyncHandler(async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "no token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const isBlackListed = await client.get(`iskconDatabase:blacklist:${token}`);

    if (isBlackListed)
      return res.status(401).json({ message: "token invalidated" });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
});
