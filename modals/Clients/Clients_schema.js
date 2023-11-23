const mongoose = require('mongoose');
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