require('dotenv').config()
const express = require('express')
const app = express()
const XMLHttpRequest = require('xhr2')
const axios = require('axios')

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
/* app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
})) */
app.use(express.json())


const apiKey = "73236e74cb434ad595726d3d36ab0aff";

app.get('/', (req, res) => {
    axios.get('https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018471017987/LinkedProfiles/', {
        headers: {
            'X-API-Key': apiKey
        }
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log('----- ERROR in GET / route -----\n', error)
    })
})

const server = app.listen(PORT, () => {
    console.log('You are listening on PORT ', PORT)
})