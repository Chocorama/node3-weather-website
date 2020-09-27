const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const _ = require('lodash');

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Geeter',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Geeter',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'this is some helpful text',
    title: 'Help',
    name: 'Geeter',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'An address must be provided',
    });
  }

  geocode(
    _.startCase(req.query.address),
    (error, { longitude, latitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location: placeName,
          forecastData: forecastData,
          address: _.startCase(req.query.address),
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help',
    name: 'Geet',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Geeter',
    errorMessage: 'Page not found',
  });
});

//app.com
//app.com/help
// app.com/about

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

//.get is for when someone visits the page it describes what the homepage will do for them, gets called with 2 arguments
//apparently express is more like a function than an object
//our web server is designed to send back html to be rendered in browser or JSON to be consumed and used by code. we do this using res.send()
//__dirname contains a path to the directory that the current script lives in
//__filename is similar but is a also a variable that provides a path to the file itself
//its important to note that both these are provided by the wrapper function such as when we debugged in a previous lesson
//that wrapper also provides special things to our code like the require function that we use all the time
//The path module provides utilities for working with file and directory paths.
//path is a core module and doesnt need to be installed in. remember require in core modules ahead of npm modules, at the top
// .use is a way to customize your server
//we pass express.static which is a function thats passing its return value into use
//we ca remove the first app.get because the the static call will find index.html as a match
//css will go in public folder as the public folder is the only directory exposed to webserver as displayed up above
//static means the assets dont change, static webpage and not a dynamic one
//going to use dynamic engine called handlebars to setup a dynamic site through express
//set allows us to set a value for a given express setting
//render allows us to render one of our views and we have configured express to use the view engine hbs so with render we can render one of our handlebars templates

//geocode takes in two arguments, the first being the address and the second being the callback function which takes in two arguments. first being error as a string and second being data as an object
