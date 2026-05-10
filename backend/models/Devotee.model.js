const mongoose = require("mongoose");

const devoteeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  user: { type: String },
  address: { type: String },
  phone: { type: Number, required: true },
  occupation: { type: String },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  date: { type: Date, default: Date.now },
  imported: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Devotee", devoteeSchema);
