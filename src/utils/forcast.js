const request = require('request')

const forcast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ecbca7cc2e26c97735fd1f3dbc69ebc0&query=' + latitude + ',' + longitude

    request({url: url, json: true}, (error,response) => {
        if(error){
            callback("cannot connect to site",undefined)
        } else if(response.body.error){
            callback("incorrect location is set",undefined)
        } else{
            callback(undefined,"It is currently " + response.body.current.temperature + " degrees out. There is a " + response.body.current.feelslike + "% chance of rain.")
        }
    })
}

module.exports = forcast