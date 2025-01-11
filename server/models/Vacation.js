
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
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    activities:
        [{
            type: mongoose.Types.objectId,
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
        default: ''
    }
},
    { timestamps: true })

module.exports = mongoose.model('Vacation', vacationSchema)