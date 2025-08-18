// server/routes/inquiryRoutes.js
const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry"); // adjust path if needed
const twilioClient = require("../twilioClient");

router.post("/submit", async (req, res) => {
  try {
    // Save the inquiry
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    // Prepare SMS content
    const { fullName, email, mobile, message } = req.body;

    // Customize the SMS body as you like
    const smsBody = `New Inquiry from ${fullName || "Unknown"}.
Phone: ${mobile || "N/A"}
Email: ${email || "N/A"}
Message: ${message || ""}`;
    console.log("SMS Body::::::", smsBody);
    // Send SMS to admin
    const from = process.env.TWILIO_PHONE_NUMBER;
    const to = process.env.ADMIN_PHONE_NUMBER;

    // Twilio SMS
    await twilioClient.messages.create({
      body: smsBody,
      from,
      to,
    });

    res
      .status(200)
      .json({ success: true, message: "Inquiry submitted successfully!" });
  } catch (err) {
    console.error("Submit error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
    console.log("Inquiries fetched successfully");
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries" });
  }
});

module.exports = router;