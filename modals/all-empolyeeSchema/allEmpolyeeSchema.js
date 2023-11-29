<<<<<<< HEAD
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Joi = require('@hapi/joi');

// const allemployeeSchema = new Schema({
//     First_Name: {
//         type: String,
//         required: true,
//     },
//     last_Name: {
//         type: String,
//         required: true,
//     },
//     User_Name: {
//         type: String,
//         required: true,
//     },
//     Email: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true,
//     },
//     Password: {
//         type: String,
//         required: true,
//     },
//     Confirm_Password: {
//         type: String,
//         required: true,
//     },
//     Company:{
//         type: String,
//         required: true, 
//     },
//     Employee_ID: {
//         type: String,
//         required: true,
//     },
//     Mobile_No: {
//         type: Number,
//         required: true,
//     },
//     Department: {
//         type: String,
//         required: true,
//     },
//     Designation: {
//         type: String,
//         required: true,
//     },
//     Joining_Date: {
//         type: String,
//         default: Date.now,
//     },
// });

// const allemployee = mongoose.model('allemployee user', allemployeeSchema);

// module.exports = allemployee;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe

const allemployeeSchema = new Schema({
    First_Name: {
        type: String,
        required: true,
    },
    last_Name: {
        type: String,
        required: true,
    },
    User_Name: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
    email: {
=======
    Email: {
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
        type: String,
        unique: true,
        required: true,
        trim: true,
<<<<<<< HEAD
        validate: {
            validator: function (v) {
                // Use a regular expression or another method to validate the email format
                // For example, you can use a regex like /^\S+@\S+\.\S+$/
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: 'Invalid email format',
        },
=======
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    },
    Password: {
        type: String,
        required: true,
    },
    Confirm_Password: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
    Company: {
        type: String,
        required: true,
=======
    Company:{
        type: String,
        required: true, 
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    },
    Employee_ID: {
        type: String,
        required: true,
    },
    Mobile_No: {
        type: Number,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
        required: true,
    },
    Joining_Date: {
        type: String,
        default: Date.now,
    },
});

const allemployee = mongoose.model('allemployee user', allemployeeSchema);

<<<<<<< HEAD
module.exports = allemployee;
=======
module.exports = allemployee;
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
