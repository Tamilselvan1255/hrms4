const mongoose = require('mongoose');
<<<<<<< HEAD

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
=======
const Schema = mongoose.Schema;



const ClientsSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        unique: true,
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    Project: {
        type: String,
        required: true,
    },
    Mobile_Number: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        default: Date.now,
    },
    Company_Name:{
        type:String,
        reduired:true
    }


});

const Clients = mongoose.model('Clients new user', ClientsSchema);

module.exports = Clients;
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
