// backend/models/Event.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  venueEmail: { type: String, required: true },
  tickets: [ticketSchema]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
