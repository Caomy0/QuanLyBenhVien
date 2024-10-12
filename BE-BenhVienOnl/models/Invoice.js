const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  amount: Number,
  status: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
