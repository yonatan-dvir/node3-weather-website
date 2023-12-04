const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoieW9uYXRhbmR2aXIiLCJhIjoiY2xwbmF4a3NkMGo5dDJtdDN1dzVuaDY1OSJ9.yD9BaMV_sDYa1C-PtrVTmw'
   
    request({ url, json: true} , (error, { body }) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0){
            callback('Unable to find location, Try again...', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.query[0]
            })
        }
    })
}

//Export geocode from the file
module.exports = geocode