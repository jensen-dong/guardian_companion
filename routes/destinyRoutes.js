const express = require('express')
const { 
    createWeapon,
    getWeapons,
    getWeapon,
    deleteWeapon,
    updateWeapon,
    createFavorite,
    getLoadouts,
    createLoadout
    /* getBungieAcc,
    getLoadout,
    getFavorites,
    getProfile,
    getCharacter,
    getInventory,
    deleteLoadout,
    updateLoadout */
 } = require('../controllers/destinyController')

const router = express.Router()

// GET Bungie login
// router.get('/bungieacc', getBungieAcc)

// GET all weapons
router.get('/', getWeapons)

// GET single Weapon
router.get('/:id', getWeapon)

// GET all loadouts
router.get('/loadouts', getLoadouts)

// GET single loadout
//router.get('/loadouts/:id', getLoadout)

// GET favorite weapons
//router.get('/favorites', getFavorites)

// GET profile info
//router.get('profile', getProfile)

// GET character loadout
//router.get('profile/:id', getCharacter)

// GET character inventory
//router.get('profile/:id/inv', getInventory)

// POST new Weapon
router.post('/', createWeapon)

// POST new loadout
router.post('/loadouts', createLoadout)

// POST new favorites
router.post('/favorites', createFavorite)

// DELETE a Weapon
router.delete('/:id', deleteWeapon)

// DELETE a loadout
//router.delete('/:id', deleteLoadout)

// UPDATE a Weapon
router.put('/:id', updateWeapon)

// UPDATE a loadout
//router.put('/:id', updateLoadout)

module.exports = router