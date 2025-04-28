
const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
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