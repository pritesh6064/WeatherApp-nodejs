const path = require('path'),
    express = require('express'),
    hbs = require('hbs'),
    geocode = require('./utils/geocode'),
    forecast = require('./utils/forecast');

//Defining paths for Express Config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

//Set handle bar for template engine
app.set('view engine', 'hbs');

//give exact name 'view engine' and put .hbs in default '/views' folder
//OR we can change default views folder to custom folder
app.set('views', viewsPath);

//set path to partials
hbs.registerPartials(partialsPath);

//Set up static directory to serve Images, css, JS
app.use(express.static(publicDir));

//Register Pages
app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather App',
        name: 'Pritesh Patel'
    });
});

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About Me',
        name: 'Pritesh Patel'
    });
});

app.get('/help', (req, resp) => {
    resp.render('help', {
        message: 'Help is on way!',
        title: 'Help',
        name: 'Pritesh Patel'
    });
});

app.get('/weather', (req, resp) => {
    if (!req.query || !req.query.address) {
        return resp.send({
            error: 'You must provide address term'
        });
    }

    geocode(req.query.address, (error, { latitude, Longitude, place_name } = {}) => {
        if (error) {
            return resp.send({
                error
            });
        }

        forecast(latitude, Longitude, (error, forecastData) => {
            if (error) {
                return resp.send({
                    error
                });
            }
            return resp.send({
                Location: place_name,
                Forecast: forecastData
            });
        });
    });
});


//'help/*' will shwo anything that doesnt match for help page
app.get('/help/*', (req, resp) => {
    resp.render('404', {
        message: 'Help Article Not Found',
        title: 'Weather App',
        name: 'Pritesh Patel'
    });
});

//This is 404 page. '* will navigate any page that is not registered to this
//this needs to come last because this should only be used when no route was found
app.get('*', (req, resp) => {
    resp.render('404', {
        message: 'Page Not Found',
        title: 'Weather App',
        name: 'Pritesh Patel'
    });
});


app.listen(3000, () => {
    console.log('Server started on port number: 3000');
});