

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    // userId:{
    //     type:String,
    //     required:true,
    // }, 
    Training_Type:{
        type:String,
        required:true,
    },
    Employee:{
        type:String,
        required:true,   
    },
    Trainer:{
        type:String,
        required:true,
    },
    Start_Date :{
        type:Date,
        required:true,
    },
    End_Date:{
        type:Date,
        required:true
    },
    Discription:{
        type:String,
        required:true,
    },
    Training_Cost:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true

    }
   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Training',userSchema)

module.exports=loginUsers;