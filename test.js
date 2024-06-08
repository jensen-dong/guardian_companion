require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose')
const destinyRoutes = require('./routes/destinyRoutes')
const apiKey = process.env.API_KEY;
const SECRET_SESSION = process.env.SECRET_SESSION;
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport-config')
const isLoggedIn = require('./middleware/isLoggedIn')
const { User } = require('./models')


/* const destiny = new Destiny2API({
    key: apiKey
}); */

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

//middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next(); //going to said route
})


// Routes
app.use('/api/destiny', destinyRoutes)

app.get('/', (req, res) => {
    res.redirect('/api/destiny');
})



app.use('/auth', require('./controllers/auth'))



// --- AUTHENTICATED ROUTE user profile page ---
app.get('/profile', isLoggedIn, (req, res) => {
    const { name, email, phone} = req.user
    res.render('profile', { name, email, phone })
})


const server = app.listen(PORT, () => {
    console.log('You are listening on PORT ', PORT)
})

module.exports = server;


    /* axios.get('https://www.bungie.net/Platform/Destiny2/Manifest/', {
        headers: {
            'X-API-Key': apiKey
        }
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log('----- ERROR in GET / route -----\n', error)
    }) */
    /* axios.get('https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018471017987/LinkedProfiles/', {
        headers: {
            'X-API-Key': apiKey
        }
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log('----- ERROR in GET / route -----\n', error)
    }) */
    /* destiny.getProfile(3, '4611686018471017987', [200])
    .then(response => res.send(response.data))
    .catch(err => console.log(`Error: ${err}`)) */
    /* res.send(response.weaponList.data) */