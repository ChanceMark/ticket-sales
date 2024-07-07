// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

const sendEmail = require('../utils/email');
const authMiddleware = require('../middleware/auth'); // Import authMiddleware


router.get('/', authMiddleware, async (req, res) => {
  const bookings = await Booking.find().populate('eventId');
  res.json(bookings);
});

router.post('/', async (req, res) => {
    const { eventId, clientName, clientEmail, tickets, totalPrice } = req.body;
    const booking = new Booking({ eventId, clientName, clientEmail, tickets, totalPrice });
    await booking.save();
//   res.json(booking);

    const event = await Event.findById(eventId);
    const emailText = `Thank you for booking ${event.title}.\n\nDetails:\nName: ${clientName}\nTickets: ${tickets.map(t => `${t.quantity} x ${t.type}`).join(', ')}\nTotal Price: $${totalPrice}`;

    sendEmail(clientEmail, 'Booking Confirmation', emailText);
    sendEmail(event.venueEmail, 'New Booking', emailText);
    sendEmail(process.env.ADMIN_EMAIL, 'New Booking', emailText);

    res.json({ message: 'Booking successful' });
});

module.exports = router;
