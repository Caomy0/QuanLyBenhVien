const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  age: Number,
  gender: String,
  medicalHistory: String,
  contact: {
    phone: String,
    address: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
