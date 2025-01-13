
const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    orderedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    trip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trip",
      default:null
    },
    vacation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vacation",
        default:null
    },
    numOfJoined:{
        type:Number
    }

    
},
    {
        timestamps: true
    })
    module.exports=mongoose.model('Order',orderSchema)
