const mongoose = require("mongoose");
const { trimmedString, normalizedString } = require("../utils/schemaFields");

const Course = new mongoose.Schema({
  name: trimmedString,
  department: { ...normalizedString, enum: ["iyf", "congreation"] },
  startDate: { type: Date, required: true },
  expectedEndDate: { type: Date, required: true },
});

module.exports = mongoose.model("course", Course);
