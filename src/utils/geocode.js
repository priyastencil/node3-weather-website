const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJpeWFtYW5qYW5rYXJuaSIsImEiOiJja285NzQ5Ynoxc3dxMnVwZDkybDRqM2I5In0.sA7PWHFEylTSc3ZiAD47AA&limit=1'    
       request({url, json: true}, (error, { body }) => {
           if (error){
               callback('unabe to connect to location services', undefined)
           } else if (body.features.length === 0){
               callback('unable to find location. try another search', undefined)
           } else {
               //const longitude = response.body.features[0].center[0]
               //const latitude = response.body.features[0].center[1]
               callback(undefined, {
                   longitude: body.features[0].center[0], 
                   latitude:  body.features[0].center[1],
                   location:  body.features[0].place_name
               })            
           }
       })
   }

   module.exports= geocode