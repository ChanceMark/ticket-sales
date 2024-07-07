// backend/seed.js
const mongoose = require('mongoose');
const Event = require('./models/Event');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });

// Create seed data
const seedEvents = [
  {
    title: 'Music Concert',
    date: new Date('2024-08-01T19:00:00'),
    location: 'Concert Hall, City Center',
    description: 'Enjoy a night of live music with popular bands.',
    image: 'concert.jpg',
    venueEmail: 'concert@venue.com',
    tickets: [
      { type: 'Standard Adult', price: 20, available: 100 },
      { type: 'Standard Child', price: 8, available: 50 },
      { type: 'VIP Package', price: 100, available: 10 }
    ]
  },
  {
    title: 'Art Exhibition',
    date: new Date('2024-08-10T10:00:00'),
    location: 'Art Gallery, Downtown',
    description: 'Explore contemporary art from various artists.',
    image: 'art.jpg',
    venueEmail: 'art@venue.com',
    tickets: [
      { type: 'General Admission', price: 15, available: 200 }
    ]
  }
];

const seedAdmin = {
  username: 'admin',
  password: bcrypt.hashSync('password', 10)
};

// Seed the database
const seedDB = async () => {
  try {
    await Event.deleteMany({});
    await Event.insertMany(seedEvents);
    await Admin.deleteMany({});
    await Admin.create(seedAdmin);
    console.log('Database seeded!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedDB();
