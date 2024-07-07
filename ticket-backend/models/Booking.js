// backend/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  clientName: String,
  clientEmail: String,
  tickets: [
    {
      type: String,
      quantity: Number
    }
  ],
  totalPrice: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
