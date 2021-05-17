const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5eafa2331539c8b4d363769fa90b893&query='+ encodeURIComponent(address) +'&units=f'   
    console.log(url) 
    request({url, json: true}, (error, { body }) => {
           if (error){
               callback('unabe to connect to location services weatherstack', undefined)
           } else if (body.error){
               callback('unable to find location on weatherstack. try another search', undefined)
           } else {
               //const longitude = response.body.features[0].center[0]
               //const latitude = response.body.features[0].center[1]
               callback(undefined, {
                   teamperature: body.current.temperature, 
                   feelslike:  body.current.feelslike,
                   description:  body.current.weather_descriptions
               })            
           }
       })
   }

   module.exports= forecast