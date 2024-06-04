const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    watermark: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Gear', gearSchema)