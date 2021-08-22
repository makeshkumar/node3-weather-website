const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=ff6b5a4db6b223b45740a575dab01350&query='+ lat +',' + long +''
    request({url, json:true}, (err, { body }) => {
        if(err) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('coordinate error', undefined)
        } else {
            const data = { 
                temperature : body.current.temperature,
                precip: body.current.precip,
                conditions: body.current.weather_descriptions[0],
                humidity:  body.current.humidity,
                feelslike: body.current.feelslike
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast