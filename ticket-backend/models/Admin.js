// backend/models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('Admin', AdminSchema);
