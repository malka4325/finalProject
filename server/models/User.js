
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
        enum:["client","admin"],
        default:"client"
    },
    tripHistory:{
        type:[{trip:{type:mongoose.Schema.Types.ObjectId,ref:"Trip"}}],
        default:null
    },
    vacationHistory:{
        type:[{trip:{type:mongoose.Schema.Types.ObjectId,ref:"Vacation"}}],
        default:null
    }
},
    {
        timestamps: true
    })
    module.exports=mongoose.model('User',userSchema)
