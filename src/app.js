const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory path
app.use(express.static(publicDirPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Index Page',
        footerText: 'copyright @ Nilanjan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        footerText: 'copyright @ Nilanjan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        footerText: 'copyright @ Nilanjan'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        });
    }

    geocode(req.query.address, (error, geores = {}) => {
        if(error){
            return res.send({ error });
        }

        const { latitude, longitude, location } = geores;

        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({ error }); 
            }

            res.send({ location, forecast, address: req.query.address });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'No search term provided'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article 404 page',
        errorMsg: 'Help article not found',
        footerText: 'copyright @ Nilanjan'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Generic 404 page',
        errorMsg: 'Page not found',
        footerText: 'copyright @ Nilanjan'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});