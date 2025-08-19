// models/Inquiry.js
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  message: String,
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    // Do not set a default here to avoid auto-selection
    // default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
