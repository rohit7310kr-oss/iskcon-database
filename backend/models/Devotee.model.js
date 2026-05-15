const mongoose = require("mongoose");
const { normalizedString, trimmedString } = require("../utils/schemaFields");

const devoteeSchema = new mongoose.Schema({
  // Phase-1
  course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  fullName: { ...trimmedString, required: true },
  phone: { type: Number, required: true },
  address: normalizedString,
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  registrationDate: { type: Date, default: Date.now },
  occupation: normalizedString,

  // Phase-2
  department: {
    ...normalizedString,
    enum: ["iyf", "congreation"],
  },
  status: {
    ...normalizedString,
    default: "new",
    enum: ["new", "sunday-comer", "daily-comer", "disconnected"],
  },
  initiationStatus: {
    ...normalizedString,
    enum: [
      "non-initiated",
      "harinam-initiated",
      "brahman-initiated",
      "sanyas-initiated",
    ],
    default: "non-initiated",
  },
  maritalStatus: {
    type: String,
    enum: ["un-married", "married", "widowed", "brahmchari"],
  },
  age: Number,

  // phase-3
  chantingRounds: { type: Number, default: 0 },
  guruName: normalizedString,
  templeName: { ...normalizedString, default: "durg" },
  joinedDate: Date,

  services: [normalizedString],
  booksRead: [normalizedString],
  skills: [normalizedString],

  counselor: normalizedString,

  // phase-3
  education: normalizedString,
  company: normalizedString,
  designation: normalizedString,

  // Backend handled data
  user: { type: String },
  createdAt: { type: Date, default: Date.now },
  imported: { type: Boolean, required: false, default: false },
});

module.exports = mongoose.model("Devotee", devoteeSchema);
