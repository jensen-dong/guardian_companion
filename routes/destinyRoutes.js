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
    deleteLoadout,
    getXur
} = require('../controllers/destinyController');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

// GET all weapons (public access)
router.get('/', getWeapons);

// GET single Weapon (public access)
router.get('/:id', getWeapon);

// GET Xur inventory
router.get('/xur', getXur)

// GET all loadouts (requires authentication)
router.get('/loadouts', isLoggedIn, getLoadouts);

// GET favorite weapons (requires authentication)
router.get('/favorites', isLoggedIn, getFavorites);

// POST new loadout (requires authentication)
router.post('/loadouts', isLoggedIn, createLoadout);

// POST new favorite (requires authentication)
router.post('/favorites', isLoggedIn, createFavorite);

// DELETE a loadout (requires authentication)
router.delete('/loadouts/:id', isLoggedIn, deleteLoadout);

// DELETE a favorite (requires authentication)
router.delete('/favorites/:id', isLoggedIn, deleteFavorite);

// POST new Weapon (requires authentication)
router.post('/', isLoggedIn, createWeapon);

// DELETE a Weapon (requires authentication)
router.delete('/:id', isLoggedIn, deleteWeapon);

// UPDATE a Weapon (requires authentication)
router.put('/:id', isLoggedIn, updateWeapon);

module.exports = router;