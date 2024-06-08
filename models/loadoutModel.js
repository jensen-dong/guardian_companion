const mongoose = require('mongoose')

const Schema = mongoose.Schema

const loadoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subclass: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    gear: {
        kinetic: {
            type: String,
            required: true
        },
        energy: {
            type: String,
            required: true
        }, 
        heavy: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('Loadout', loadoutSchema)