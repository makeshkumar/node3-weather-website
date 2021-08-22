const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFrZXNoMTk5MCIsImEiOiJja3NsZzIxd2YxNHN3MnZveDNvMDBneGRxIn0.gsT1sU-k8Cxs3FAYAzOIsA&country=IN&limit=1'
    request({url, json:true}, (err, { body }) => {
        
        if(err) {
            callback('unable to connect', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find lat/long', undefined)
        } else {
            const data = {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0]
                //location: res.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode