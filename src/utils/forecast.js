const request = require('request');
const chalk = require('chalk');

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2f879d731c37c23304e9c2855c63a789&query=' + latitude + ',' + longitude +'';

    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURLComponent(address)+'.json?access_token=pk.eyJ1IjoiYXNoaXNobWVoZXIyMTYiLCJhIjoiY2tjNDhjZGw5MDN5MDJwbnoxMzB0c3B6NiJ9.vip_ldXzv_s2sgK0RjnRkg';
   
    request({url, json:true}, (error,{body})=>{
        if(error){
            // console.log(error);
            callback('Unable to connect to location services! Please check your internet.',undefined);
        }else if(body.error){
            callback('Unable to find location. Please try another search.',undefined);
        }else{
            callback(undefined, "It is currently "+body.current.temperature+" degrees out. It feels like "+ 
                                body.current.feelslike+ " degrees out.  Weather:" + body.current.weather_descriptions+ " There is a "+ body.current.precip+ "% chance of rain."
            );  
        }
    });


    //previous code

    // request({url : url, json:true}, (error,response)=>{
    //     if(error){
    //         // console.log(error);
    //         callback('Unable to connect to location services! Please check your internet.',undefined);
    //     }else if(response.body.error){
    //         callback('Unable to find location. Please try another search.',undefined);
    //     }else{
    //         callback(undefined, "It is currently "+response.body.current.temperature+" degrees out. It feels like "+ 
    //                             response.body.current.feelslike+ " degrees out.  Weather:" + response.body.current.weather_descriptions+ " There is a "+ response.body.current.precip+ "% chance of rain."
    //         );  
    //     }
    // });
};

module.exports = forecast;