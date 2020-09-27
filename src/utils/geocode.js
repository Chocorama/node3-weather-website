const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2hvY29yYW1hIiwiYSI6ImNrZjkwYTI0YTBoZzgycW9iZGtzZGxsNWoifQ.KtkFbeDj0y2NCq7nZAjbiQ&limit=1`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        placeName: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

//THIS IS INCORRECT!!!!!it looks like the callback does align with the request function parameter
//ABOUT CALLBACKS!!!!!!!!!!!!this is an update to line above after rewatching the video. He stated that its common convention to setup arguments of error and data for callbacks and we did that on line 55 of app.js. we defined them there. thats why above our callbacks have a string for the error and undefined/data for the other parameter. so in conclusion this has nothing to do with the request parameter like i initially thought.
//explained line 120 of app.js
