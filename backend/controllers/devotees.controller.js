const catchAsyncHandler = require("../middleware/catchAsyncHandler");
const Devotee = require("../models/Devotee.model");
const UserModel = require("../models/User.model");

exports.getDevotees = catchAsyncHandler(async (req, res) => {
  const devotees = await Devotee.find().sort({ createdAt: -1 });
  res.json(devotees);
});

exports.createDevotee = catchAsyncHandler(async (req, res) => {
  const devotee = await Devotee.create({ ...req.body, user: req.user.email });

  res.status(201).json(devotee);
});

exports.getDevoteeById = catchAsyncHandler(async (req, res) => {
  const devotee = await Devotee.findById(req.params.id);
  if (!devotee) {
    return res.status(404).json({ message: "Devotee not found" });
  }
  res.json(devotee);
});

exports.updateDevotee = catchAsyncHandler(async (req, res) => {
  const devotee = await Devotee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!devotee) {
    return res.status(404).json({ message: "Devotee not found" });
  }
  res.json(devotee);
});

exports.deleteDevotee = catchAsyncHandler(async (req, res) => {
  const devotee = await Devotee.findByIdAndDelete(req.params.id);
  if (!devotee) {
    return res.status(404).json({ message: "Devotee not found" });
  }
  res.json({ message: "Devotee removed" });
});
