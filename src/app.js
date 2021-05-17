const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Priya Manjankarni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Priya Manjankarni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help from handlebar',
        para:'We can help you with your questions here!',
        name: 'Priya Manjankarni'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { location, forecastData } = {}) => {
        if(error){
           return res.send({ error })
        }
        console.log(location, forecastData)
        forecast(req.query.address, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            console.log(location, forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })    
    })

    // res.send({
    //     location: 'San Jose',
    //     temperature: 75,
    //     feelsLike: 'cloudy',
    //     address: req.query.address
    // }}
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        text: 'Help article not found',
        title: '404 Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        text: 'My 404 page',
        title: '404 Page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})