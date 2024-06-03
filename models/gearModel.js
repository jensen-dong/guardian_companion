const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    flavorTest: {
        type: String,
        required: true
    },
    stats: {
        type: Object,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Gear', gearSchema)