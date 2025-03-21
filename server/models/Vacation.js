
const mongoose = require("mongoose")

const vacationSchema = new mongoose.Schema({
    area: {
        type: String,
        enum: ['צפון', 'דרום', 'מרכז', 'אזור ירושלים'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    TargetAudience: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        // required: true
    },
    endDate: {
        type: Date,
        // required: true
    },
    activities:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }],
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
    rating:{
        type:Number,
        default:4
    }
},
    { timestamps: true })

module.exports = mongoose.model('Vacation', vacationSchema)