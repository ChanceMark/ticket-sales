// backend/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth'); // Import authMiddleware

router.get('/', async (req, res) => {
  try {
    // console.log("get message receive!!!");
    const events = await Event.find().sort('date');
    res.json(events);
  } catch (err) {
    // console.log("get error!!!");
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, date, location, description, image, venueEmail, tickets } = req.body;
  const event = new Event({ title, date, location, description, image, venueEmail, tickets });
  await event.save();
  res.json(event);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, date, location, description, image, venueEmail, tickets } = req.body;
  const event = await Event.findByIdAndUpdate(req.params.id, { title, date, location, description, image, venueEmail, tickets }, { new: true });
  res.json(event);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

module.exports = router;
