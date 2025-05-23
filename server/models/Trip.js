
const mongoose = require("mongoose")

const tripSchema = new mongoose.Schema({
    area: {
        type: String,
        enum: ['צפון', 'דרום', 'מרכז', 'אזור ירושלים'],
        required: true
    },
    location: {
        type: String,
    },
    description:{
        type: String,
    },
    targetAudience: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    activities:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }]
    ,
    maxParticipants: {
        type: Number,
        required: true
    },
    currentParticipants: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    imageSrc: {
        type: String,
        default: 'http://localhost:4300/uploads/logo.jpg'
    },
    madeByType:{
        type: String,
        enum: ['Client','Admin'],
        default:'Admin'
    },
    madeById:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isApproved: {
        type: Boolean,
        default:true
    },

},
    { timestamps: true })

module.exports = mongoose.model('Trip', tripSchema)