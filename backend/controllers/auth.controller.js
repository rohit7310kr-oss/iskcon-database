const jwt = require("jsonwebtoken");
const catchAsyncHandler = require("../middleware/catchAsyncHandler");
const User = require("../models/User.model");

const getToken = function (role, email) {
  return jwt.sign({ role, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsyncHandler(async function (req, res) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.user);

  const query = isEmail ? { email: req.body.user } : { phone: req.body.user };

  const user = await User.findOne(query);
  if (!user)
    return res
      .status(400)
      .json({ status: "fail", data: null, message: "no user found" });

  if (user.password !== req.body.password)
    return res
      .status(400)
      .json({ status: "fail", data: null, message: "wrong credentials" });

  const token = getToken(user.role, user.email);

  res.status(200).json({ token, status: "success", data: user });
});

exports.createUser = catchAsyncHandler(async function (req, res) {
  if (req.body.phone.length !== 10)
    return res
      .status(400)
      .json({ status: "fail", message: "Phone number must be 10 digit" });

  if (req.body.password !== req.body.confirmPassword)
    return res
      .status(400)
      .json({ status: "fail", message: "please match the password" });

  req.body.confirmPassword = undefined;

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  if (user)
    return res
      .status(400)
      .json({ status: "fail", message: "user already exist", data: null });

  const newUser = await User.create(req.body);

  const token = getToken(newUser.role, newUser.email);

  res.status(200).json({ data: newUser, token, status: "success" });
});
