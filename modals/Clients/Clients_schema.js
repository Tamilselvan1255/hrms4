const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensures uniqueness of the email field
    required: true,
    trim: true, // Removes leading and trailing whitespaces
    lowercase: true, // Converts the email to lowercase
  },
  Project: {
    type: String,
    required: true,
  },
  Mobile_Number: {
    type: Number,
    required: true,
  },
  Company_Name: {
    type: String,
    required: true,
  },
});

const Clients = mongoose.model('Clients', ClientsSchema);

module.exports = Clients;
