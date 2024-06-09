const Weapon = require('../models/weaponModel');
const Loadout = require('../models/loadoutModel');
const mongoose = require('mongoose');
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
    const { id } = req.params;
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

    try {
        const weapon = await Weapon.create({ name, hash, loreHash, icon, weaponType, ammoType });
        res.status(200).json(weapon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// create new weapon
const createWeapon = async (req, res) => {
    const { name, id, icon } = req.body;

    try {
        const weapon = await Weapon.create({ name, id, icon });
        res.status(200).json(weapon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a weapon
const deleteWeapon = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such weapon' });
    }

    const weapon = await Weapon.findOneAndDelete({ _id: id });

    if (!weapon) {
        return res.status(404).json({ error: 'No such weapon' });
    }

    res.status(200).json({ weapon });
};

// update a weapon
const updateWeapon = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such weapon' });
    }

    const weapon = await Weapon.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!weapon) {
        return res.status(404).json({ error: 'No such weapon' });
    }

    res.status(200).json(weapon);
};

// Get all loadouts
const getLoadouts = async (req, res) => {
    try {
        const loadouts = await Loadout.find({});
        res.render('loadouts', { loadouts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new loadout
const createLoadout = async (req, res) => {
    const { name, gear } = req.body;

    if (!gear.kinetic && !gear.energy) {
        return res.status(400).json({ error: 'Loadout must include at least one primary or special weapon.' });
    }

    if (!gear.heavy) {
        return res.status(400).json({ error: 'Loadout must include one heavy weapon.' });
    }

    try {
        const loadout = new Loadout({ name, gear });
        await loadout.save();
        res.status(200).json(loadout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get favorites
const getFavorites = async (req, res) => {
    try {
        const favorites = await Weapon.find({});
        res.render('favorites', { weaponsArr: favorites });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete favorite weapon
const deleteFavorite = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such favorite' });
    }

    const favorite = await Weapon.findOneAndDelete({ _id: id });

    if (!favorite) {
        return res.status(404).json({ error: 'No such favorite' });
    }

    res.status(200).json({ favorite });
};

// delete loadout
const deleteLoadout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such loadout' });
    }

    const loadout = await Loadout.findOneAndDelete({ _id: id });

    if (!loadout) {
        return res.status(404).json({ error: 'No such loadout' });
    }

    res.status(200).json({ loadout });
};

module.exports = {
    createWeapon,
    getWeapons,
    getWeapon,
    deleteWeapon,
    updateWeapon,
    createFavorite,
    getLoadouts,
    createLoadout,
    getFavorites,
    deleteFavorite,
    deleteLoadout
};