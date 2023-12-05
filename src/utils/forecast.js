const request = require('request')

const forecast = ({ latitude, longitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c53dce3000c68a411951788245d6c1d9&query=' + latitude + ',' + longitude

    request({ url, json: true} , (error, { body }) => {
        if (error){
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error){
            callback("Unable to find location, Try again...", undefined)
        }
        else{
            callback(undefined, {
                place: body.location.name + ", " + body.location.region + ", " + body.location.country,
                msg: "" + body.current.weather_descriptions + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike
            })
        }
    })
}

//Export forecast from the file
module.exports = forecast