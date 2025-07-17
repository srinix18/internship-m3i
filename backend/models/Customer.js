// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile:   { 
    type: String, 
    required: true, 
    match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"]
  },
  email:    {
    type: String,
    required: true,
    match: [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, "Enter a valid email address"]
  },
  city:     { type: String, required: true },
  propertyType: { type: String, required: true },
  minBudget: { type: Number, required: true },
  maxBudget: { type: Number, required: true },
  message:  { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Customer', customerSchema);
