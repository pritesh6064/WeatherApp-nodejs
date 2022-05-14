const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicHJpdGVzaDAwMDc3IiwiYSI6ImNsMnV4MHptajAwOGszYnA5eng5dHJ1eHcifQ.9H1YeyCEW-iF2SSRyxRiWg&limit=1";

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location!", undefined);
        } else {            
            const { place_name = 'null' } = body.features[0];
            callback(undefined, {
                place_name,
                Longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        }
    });
};

module.exports = geocode;