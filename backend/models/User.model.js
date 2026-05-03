const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  confirmPassword: String,
  role: {
    type: String,
    default: "volunteer",
    enum: ["admin", "volunteer"],
    required: true,
  },
});

UserSchema.pre("save", function () {
  this.password = bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("user", UserSchema);
