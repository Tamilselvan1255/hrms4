

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    // userId:{
    //     type:String,
    //     required:true,
    // },  
    Project_Name:{
        type:String,
        required:true,
    },
    Deadline:{
        type:String,
        required:true,   
    },
    Date:{
        type:Date,
        required:true
    },
    
    Total_Hours:{
        type:String,
        required:true,
    },
    Remaining_Hours :{
        type:String,
        required:true,
    },
   
    Hours:{
        type:String,
        required:true,
    },
    Discription:{
        type:String,
        required:true
    },
    
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Timesheet',userSchema)

module.exports=loginUsers;