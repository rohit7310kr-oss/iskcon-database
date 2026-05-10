const catchAsyncHandler = require("../middleware/catchAsyncHandler");
const Devotee = require("../models/Devotee.model");
const UserModel = require("../models/User.model");

const XLSX = require("xlsx");

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

exports.importDevotee = catchAsyncHandler(async (req, res) => {
  try {
    // Read excel file
    const workbook = XLSX.readFile(req.file.path);

    // First sheet
    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(sheet, {
      raw: false,
    });

    const formattedData = data.map((row) => {
      return {
        fullName: row.fullName,
        phone: row.phone,
        gender: row.gender.toLowerCase(),
        date: row.date,
        address: row.address,
        occupation: row.occupation,
        imported: true,
      };
    });

    const bulkDevotee = await Devotee.insertMany(formattedData, {
      ordered: false,
    });

    console.log(formattedData.length, bulkDevotee.length);

    res.status(200).json({
      success: true,
      rows: bulkDevotee.length,
      bulkDevotee,
    });

    // Save into DB here
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
