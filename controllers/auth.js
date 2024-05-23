const express = require('express');
const router = express.Router()
const passport = require('../config/passport-config')

// import User model
const { User } = require('../models')

// --- signup page ---
router.get('/signup', (req, res) => {
    res.render('auth/signup', {});
})

// --- login page ---
router.get('/login', (req, res) => {
    res.render('auth/login', {});
})

// --- user logout ---
router.get('/logout', (req, res) => {
    res.locals.currentUser = null;
    req.logOut((error, next) => {
        if (error) {
            req.flash('error', 'Error logging out. Please try again')
            return next(error);
        }
        req.flash('success', 'Logging out... See you next time.')
        res.redirect('/');
    })
})

router.post('/signup', async (req, res) => {
    // create phone number error, then address solution
    // search for email in db (unique)
    try {
        const findUser = await User.findOne({ email: req.body.email });
        // if findUser is null, then create user
        if (!findUser) {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            });
            //req.flash('success', `Welcome ${newUser.name}. Account created`)
            // authenticate the user via passport
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: `Welcome ${newUser.name}. Account created`
            })(req, res);
        } else {
            req.flash('error', 'Email already exists. Try another email')
            resizeBy.redirect('/auth/signup')
        }
    } catch (error) {
        console.log('----- ERROR IN SIGNUP -----\n', error);
        if (error.errors.phone.name === 'ValidatorError') {
            req.flash('error', 'Phone number needs to be in xxx-xxx-xxxx format')
            res.redirect('/auth/signup');
        }
        
    }
})

// 
router.post('/login', passport.authenticate('local', { 
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome back to your account',
    failureFlash: 'Either email or password is incorrect. Please try again'
}), (req, res) => {
    
});

module.exports = router;