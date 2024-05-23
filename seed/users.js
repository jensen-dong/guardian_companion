const mongoose = require('mongoose')
require('dotenv').config()
const { User } = require('../models')

// create a User
User.create({
    name: 'Kevin Jones',
    email: 'kevinjones@email.com',
    phone: '123-456-7890',
    password: 'thisisapassword'
})
.then(user => {
    console.log('---- NEW USER ----\n', user)
})
.catch(error => {
    console.log('---- ERROR CREATING USER ----\n', error)
})