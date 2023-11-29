const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('@hapi/joi');




const promotionSchema = new Schema({
<<<<<<< HEAD
        promotion_employee: {
            type: String,
            require:true
        },
        department: {
            type: String,
            require:true
        },
=======
        promotion_employee: joi.string().required(),
        department: joi.string().required(),
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
        promotion_from: { 
            type: String,
            require:true
        },
        promotion_to: { 
            type: String,
            require:true
        },
        promotion_date:{
            type: Date,
            require:true

        }
       
});
const promotion = mongoose.model('promotion new ', promotionSchema);
module.exports = promotion;