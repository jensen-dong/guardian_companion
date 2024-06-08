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
                .map(([key, weapon]) => ({
                    name: weapon.displayProperties.name,
                    hash: key,
                    loreHash: weapon.loreHash,
                    icon: weapon.displayProperties.icon,
                    weaponType: weapon.itemTypeDisplayName,
                    ammoType: weapon.equippingBlock.ammoType
                }));

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
    const { id } = req.params; // The hash is passed as id in the URL
    const manifestFilePath = path.join(__dirname, '..', 'manifestStorage', 'manifest.json');
    const loreFilePath = path.join(__dirname, '..', 'manifestStorage', 'lore.json');

    fs.readFile(manifestFilePath, 'utf8', (err, manifestData) => {
        if (err) {
            console.error('Error reading manifest.json:', err);
            return res.status(500).json({ error: 'Failed to read manifest.json' });
        }
        
        try {
            const manifest = JSON.parse(manifestData);
            const weaponData = manifest[id];

            if (!weaponData) {
                return res.status(404).json({ error: 'Weapon not found' });
            }

            const weapon = {
                name: weaponData.displayProperties.name,
                hash: id,
                loreHash: weaponData.loreHash,
                icon: weaponData.displayProperties.icon,
                weaponType: weaponData.itemTypeDisplayName,
                ammoType: weaponData.equippingBlock.ammoType
            };

            fs.readFile(loreFilePath, 'utf8', (err, loreData) => {
                if (err) {
                    console.error('Error reading lore.json:', err);
                    return res.status(500).json({ error: 'Failed to read lore.json' });
                }

                try {
                    const lore = JSON.parse(loreData);
                    const loreEntry = lore[weapon.loreHash] || {};
                    const loreSubtitle = loreEntry.subtitle || 'No subtitle available';
                    const loreDescription = loreEntry.displayProperties ? loreEntry.displayProperties.description : 'No description available';

                    res.render('weapon', { weapon, loreSubtitle, loreDescription });
                } catch (err) {
                    console.error('Error parsing lore.json:', err);
                    res.status(500).json({ error: 'Failed to parse lore.json' });
                }
            });

        } catch (err) {
            console.error('Error parsing manifest.json:', err);
            res.status(500).json({ error: 'Failed to parse manifest.json' });
        }
    });
};

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