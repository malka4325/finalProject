
const mongoose = require("mongoose")

const tripSchema = new mongoose.Schema({
    area: {
        type: String,
        enum: ['צפון', 'דרום', 'מרכז', 'אזור ירושלים'],
        required: true
    },
    mainActivity: {
        type: mongoose.Types.ObjectId,
        ref: 'Activity'

    },
    TargetAudience: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    activities:
        [{
            type: mongoose.Types.objectId,
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
        default: ''
    }
},
    { timestamps: true })

module.exports = mongoose.model('Trip', tripSchema)