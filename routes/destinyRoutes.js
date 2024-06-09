const express = require('express');
const {
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
} = require('../controllers/destinyController');

const router = express.Router();

// GET all loadouts
router.get('/loadouts', getLoadouts);

// GET favorite weapons
router.get('/favorites', getFavorites);

// GET all weapons
router.get('/', getWeapons);

// GET single Weapon
router.get('/:id', getWeapon);

// POST new loadout
router.post('/loadouts', createLoadout);

// POST new favorite
router.post('/favorites', createFavorite);

// DELETE a loadout
router.delete('/loadouts/:id', deleteLoadout);

// DELETE a favorite
router.delete('/favorites/:id', deleteFavorite);

// POST new Weapon
router.post('/', createWeapon);

// DELETE a Weapon
router.delete('/:id', deleteWeapon);

// UPDATE a Weapon
router.put('/:id', updateWeapon);

module.exports = router;