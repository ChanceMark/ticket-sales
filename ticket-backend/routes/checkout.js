// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { eventId, tickets } = req.body;
  const event = await Event.findById(eventId);
  let totalPrice = 0;

  tickets.forEach(ticket => {
    const eventTicket = event.tickets.find(t => t.type === ticket.type);
    totalPrice += eventTicket.price * ticket.quantity;
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: tickets.map(ticket => {
      const eventTicket = event.tickets.find(t => t.type === ticket.type);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${event.title} - ${ticket.type}`
          },
          unit_amount: eventTicket.price * 100,
        },
        quantity: ticket.quantity,
      };
    }),
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id });
});

module.exports = router;
