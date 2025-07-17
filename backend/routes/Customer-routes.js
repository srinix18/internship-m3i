const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { sendConfirmationEmail } = require('../utils/sendEmail'); // <-- Add this line

const indianMobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

const minBudget = Number(process.env.SLIDER_MIN_BUDGET);
const maxBudget = Number(process.env.SLIDER_MAX_BUDGET);

router.post('/', async (req, res) => {
  try {
    const {
      fullName, mobile, email, city, propertyType,
      minBudget: minBudgetInput, maxBudget: maxBudgetInput, message
    } = req.body;

    if (
      !fullName || !mobile || !email || !city ||
      !propertyType || minBudgetInput == null || maxBudgetInput == null || !message
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!indianMobileRegex.test(mobile)) {
      return res.status(400).json({ error: 'Mobile must be a valid 10-digit Indian number.' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email is not valid.' });
    }

    if (
      typeof minBudgetInput !== "number" || typeof maxBudgetInput !== "number" ||
      minBudgetInput < minBudget || maxBudgetInput < minBudget ||
      minBudgetInput > maxBudget || maxBudgetInput > maxBudget ||
      minBudgetInput > maxBudgetInput
    ) {
      return res.status(400).json({ error: "Invalid min and max budget values." });
    }

    const customer = new Customer({
      fullName, mobile, email, city, propertyType,
      minBudget: minBudgetInput, maxBudget: maxBudgetInput, message
    });

    await customer.save();

    // --- Send confirmation email
    try {
      await sendConfirmationEmail({ to: email, name: fullName });
    } catch (err) {
      // Do not block the user for email failure; just log
      console.error('Confirmation email sending failed:', err);
    }

    res.status(201).json({ message: 'Customer registered successfully.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Provide slider config to frontend
router.get('/../config', (req, res) => {
  res.json({
    sliderMin: minBudget,
    sliderMax: maxBudget
  });
});

module.exports = router;
