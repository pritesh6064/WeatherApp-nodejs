const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=efa45ee2de284349d5ae033e7d5ec343&query=' + latitude + ',' + longitude + '&units=f';

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {            
            callback(body.error.info, undefined);
        } else {
            const {weather_descriptions, temperature, feelslike, humidity} = body.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} F out. It feels like ${feelslike} F. Humidity is ${humidity}%`);
        }
    });
};

module.exports = forecast;