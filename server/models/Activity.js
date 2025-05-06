
const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        enum: ['צפון', 'דרום', 'מרכז', 'אזור ירושלים','תכנית'],
        
        default:'תכנית'
    },
    imageSrc: {
        type: String,
        default: 'http://localhost:4300/uploads/logo.jpg'
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type: String,
    },
    type:{
        type:String,
        enum: ['מסלול', 'אטרקציה', 'תכנית'],
        default:'תכנית'
    },
     targetAudience: {
        type: String,
    },
},
    { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema)