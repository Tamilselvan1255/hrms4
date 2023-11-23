

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    // userId:{
    //     type:String,
    //     required:true,
    // },  
    Name:{
        type:String,
        required:true,
    },
    Start_Date:{
        type:String,
        required:true,
    },
    End_Date :{
        type:String,
        required:true,
    },
    
    Reason:{
        type:String,
        required:true,
    },

   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Leave',userSchema)

module.exports=loginUsers;