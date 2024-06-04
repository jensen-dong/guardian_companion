require('dotenv').config()
const express = require('express')
const app = express()
// const XMLHttpRequest = require('xhr2')
const axios = require('axios')
const mongoose = require('mongoose')
const Destiny2API = require('node-destiny-2')
const apiKey = "73236e74cb434ad595726d3d36ab0aff";

const destiny = new Destiny2API({
    key: apiKey
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
/* app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
})) */
app.use(express.json())


// Routes
app.get('/', (req, res) => {
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
    axios.get('https://cdn.jsdelivr.net/gh/altbdoor/d2-api-human@data/weapons/name/themountaintop.json')
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log('----- ERROR in GET / route -----\n', error)
    })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db ${mongoose.connection.host}:${mongoose.connection.port} and listening on port`, process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

