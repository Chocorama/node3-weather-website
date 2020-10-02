const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ae12844a3452bbdb1072fb6eae07ddb0&query=${long},${lat}&units=f`;

  request({ url, json: true }, (error, response) => {
    const { current } = response.body;
    if (error) {
      callback('Unable to connect to network or online service', undefined);
    } else if (response.body.error) {
      callback(
        'Couldnt locate the search term based on gived coordinates',
        undefined
      );
    } else {
      callback(
        undefined,
        `It is currently ${
          current.is_day === 'yes' ? 'day-time' : 'night-time'
        } and ${current.temperature} degrees out with ${
          current.weather_descriptions[0]
        }. 
        It feels like ${current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
