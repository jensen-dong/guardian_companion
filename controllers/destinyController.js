const Weapon = require('../models/weaponModel')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

// get all weapons
const getWeapons = (req, res) => {
    const jsonFilePath = path.join(__dirname, '..', 'manifestStorage', 'manifest.json');

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading manifest.json:', err);
            return res.status(500).json({ error: 'Failed to read manifest.json' });
        }
        
        try {
            const manifest = JSON.parse(data);
            // Filter to include only weapons with the key damageTypes and loreHash
            const weaponsArr = Object.entries(manifest)
                .filter(([key, weapon]) => weapon.damageTypes && weapon.loreHash)
                .map(([key, weapon]) => {
                    weapon.hash = key;
                    return weapon;
                });

            const shuffledWeaponsArr = weaponsArr.sort(() => Math.random() - 0.5);

            console.log(shuffledWeaponsArr.length);
            res.render('landing', { weaponsArr: shuffledWeaponsArr });
        } catch (err) {
            console.error('Error parsing manifest.json:', err);
            res.status(500).json({ error: 'Failed to parse manifest.json' });
        }
    });
};

// get single weapon
const getWeapon = (req, res) => {
    const { id } = req.params;
    const manifestPath = path.join(__dirname, '..', 'manifestStorage', 'manifest.json');
    const lorePath = path.join(__dirname, '..', 'manifestStorage', 'lore.json');

    fs.readFile(manifestPath, 'utf8', (err, manifestData) => {
        if (err) {
            console.error('Error reading manifest.json:', err);
            return res.status(500).json({ error: 'Failed to read manifest.json' });
        }

        fs.readFile(lorePath, 'utf8', (err, loreData) => {
            if (err) {
                console.error('Error reading lore.json:', err);
                return res.status(500).json({ error: 'Failed to read lore.json' });
            }

            try {
                const manifest = JSON.parse(manifestData);
                const lore = JSON.parse(loreData);

                const weapon = manifest[id];
                if (!weapon) {
                    return res.status(404).json({ error: 'No such weapon' });
                }

                const loreHash = weapon.loreHash;
                const loreDetails = lore[loreHash] || {};

                res.render('weapon', {
                    weapon: weapon,
                    loreSubtitle: loreDetails.subtitle || 'No subtitle available',
                    loreDescription: loreDetails.displayProperties?.description || 'No description available'
                });
            } catch (err) {
                console.error('Error parsing JSON files:', err);
                return res.status(500).json({ error: 'Failed to parse JSON files' });
            }
        });
    });
}

// create favorite weapon
const createFavorite = async (req, res) => {
    const { name, hash, loreHash, icon, weaponType, ammoType } = req.body;
    console.log(req.body)

    // add doc to db
    try {
        const weapon = await Weapon.create({ name, hash, loreHash, icon, weaponType, ammoType });
        res.status(200).json(weapon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// create new weapon
const createWeapon = async (req, res) => {
    const {name, id, icon} = req.body

    // add doc to db
    try {
        const weapon = await Weapon.create({name, id, icon})
        res.status(200).json(weapon)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a weapon
const deleteWeapon = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such weapon'})
    }

    const weapon = await Weapon.findOneAndDelete({_id: id})

    if(!weapon) {
        return res.status(404).json({error: 'No such weapon'})
    }

    res.status(200).json({weapon})
}

// update a weapon
const updateWeapon = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such weapon'})
    }

    const weapon = await Weapon.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!weapon) {
        return res.status(404).json({error: 'No such weapon'})
    }

    res.status(200).json(weapon)
}



module.exports = {
    createWeapon,
    getWeapons,
    getWeapon,
    deleteWeapon,
    updateWeapon,
    createFavorite
    /* getBungieAcc,
    getLoadouts,
    getLoadout,
    getFavorites,
    getProfile,
    getCharacter,
    getInventory,
    createLoadout,
    deleteLoadout,
    updateLoadout */
}