const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// set app varible 
const app = express()

// join the path with the string yo give him and define path
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// we need the next line to define 'templates' directory as the 'views' one - there Express will look for the hbs files
// set the 'views' to be viewPath...
app.set('views', viewsPath)

// we need the next line to get Handlebars (hbs) set up:
// set the 'view engine' to be hbs...
app.set('view engine', 'hbs')

// we need the next line to define 'templates' directory as the 'views' one - there Express will look for the hbs files
// set the 'views' to be partialsPath...
hbs.registerPartials(partialsPath)

//static takes the path to the folder we give it
//use is a way to customize the server
app.use(express.static(PublicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yonatan Dvir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yonatan Dvir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Yonatan Dvir',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        // if there are errors
        if (error){
            return res.send({
                error: error
            })
        }
         
        forecast( { latitude, longitude } , (error, data) => {
            if (error){
                return res.send({
                    error: error
                })
            }
    
            res.send({
                address: data.place,
                temperature: data.msg
            })

        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yonatan Dvir',
        errorMsg: 'Help article not found.'
    })})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yonatan Dvir',
        errorMsg: 'Page not found.'
    })})

// if PORT exist use it else use 3000 to run locally... (67 lesson in node course)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
})