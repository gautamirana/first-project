const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");

router.post("/submit", async (req, res) => {
  try {
    // const { fullName, email, mobile, message } = req.body;
    // const newInquiry = new Inquiry({ fullName, email, mobile, message });
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();
    res
      .status(200)
      .json({ success: true, message: "Inquiry submitted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries" });
  }
});

module.exports = router;
