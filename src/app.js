const path = require('path') // core midule
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/* console.log(__dirname)
console.log(path.join(__dirname, '../public')) */

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.get('route', function(req,res) => {})
//req -> request, res -> response
/* app.get('', (req, res) => {
    res.send('<h1>Hello express!</h1>')
}) */

app.get('', (req,res) => {
    res.render('index', {
        helpText: 'This is help text.',
        title: 'Weather App',
        name: 'Mak'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        helpText: 'This is help text.',
        name: 'Mak',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is help text.',
        name: 'Mak',
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About me</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address should not be empty'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude} = {}) => {
        if(err) {
            return res.send({
                error: err
            })
        }
        forecast(latitude, longitude, (err, {temperature, precip} = {}) => {
            if(err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                address: req.query.address,
                temperature:'It is currently '+ temperature +' degrees out.',
                precip: 'There is a '+ precip +'% chance of rain.'
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'search should not be empty'
        })
    }
    res.send({
        products:req.query
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        helpText: 'This is help text.',
        name: 'Mak',
        title: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        helpText: 'This is help text.',
        name: 'Mak',
        title: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})