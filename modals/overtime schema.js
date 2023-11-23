

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    // userId:{
    //     type:String,
    //     required:true,
    // },  
    Employee_Name:{
        type:String,
        required:true,
    },
    Discription:{
        type:String,
        required:true,
    },
    Overtime_Date :{
        type:String,
        required:true,
    },
    
    Overtime_Hour:{
        type:String,
        required:true,
    },

   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('overtime',userSchema)

module.exports=loginUsers;