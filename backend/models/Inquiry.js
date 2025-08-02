const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
