const mongoose = require('mongoose')

const Schema = mongoose.Schema

const weaponSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hash: {
        type: Number,
        required: true
    },
    loreHash: {
        type: Number
    },
    icon: {
        type: String,
        required: true
    },
    weaponType: {
        type: String,
        required: true
    },
    ammoType: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Weapon', weaponSchema)