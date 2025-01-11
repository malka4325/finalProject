
const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    }
},
    { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema)