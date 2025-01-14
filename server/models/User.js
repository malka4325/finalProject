
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type: String
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type: String
    },
    phone:{
        type: String,
    },
    role:{
        type:String,
        enum:["Client","Admin"],
        default:"Client"
    }
   
},
    {
        timestamps: true
    })
    module.exports=mongoose.model('User',userSchema)
