const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ae12844a3452bbdb1072fb6eae07ddb0&query=${long},${lat}&units=f`;

  request({ url, json: true }, (error, response) => {
    const geetGoat = (num) => {
      if (num < 70) {
        return 'Bring geet feathers';
      } else {
        return 'Leave feathers at Home';
      }
    };

    const { current } = response.body;
    console.log(current);
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
          current.temperature
        } degrees out in the feather zone and ${
          current.weather_descriptions[0]
        }. It feels like ${
          current.feelslike
        } degrees out and too hot for goating around. ${geetGoat(
          current.temperature
        )}`
      );
    }
  });
};

module.exports = forecast;
