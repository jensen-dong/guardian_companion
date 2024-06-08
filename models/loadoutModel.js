const mongoose = require('mongoose')

const Schema = mongoose.Schema

const loadoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gear: {
        kinetic: {
            name: {
                type: String,
                required: true
            },
            hash: {
                type: Number,
                required: true
            },
            loreHash: {
                type: Number,
                required: true
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
        },
        energy: {
            name: {
                type: String,
                required: true
            },
            hash: {
                type: Number,
                required: true
            },
            loreHash: {
                type: Number,
                required: true
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
        }, 
        heavy: {
            name: {
                type: String,
                required: true
            },
            hash: {
                type: Number,
                required: true
            },
            loreHash: {
                type: Number,
                required: true
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
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('Loadout', loadoutSchema)