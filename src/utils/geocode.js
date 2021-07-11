const request = require('request');
const chalk = require('chalk');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXNoaXNobWVoZXIyMTYiLCJhIjoiY2tjNDhjZGw5MDN5MDJwbnoxMzB0c3B6NiJ9.vip_ldXzv_s2sgK0RjnRkg';
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURLComponent(address)+'.json?access_token=pk.eyJ1IjoiYXNoaXNobWVoZXIyMTYiLCJhIjoiY2tjNDhjZGw5MDN5MDJwbnoxMzB0c3B6NiJ9.vip_ldXzv_s2sgK0RjnRkg';
    request({url, json:true}, (error,{body})=>{
        if(error){
            // console.log(error);
            callback('Unable to connect to location services! Please check your internet.',undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Please try another search.',undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            } );  //no error, so set to undefined
        }
    });
    
    
    
    //previous code
    
    // request({url : url, json:true}, (error,response)=>{
    //     if(error){
    //         // console.log(error);
    //         callback('Unable to connect to location services! Please check your internet.',undefined);
    //     }else if(response.body.features.length === 0){
    //         callback('Unable to find location. Please try another search.',undefined);
    //     }else{
    //         callback(undefined, {
    //             latitude: response.body.features[0].center[1],
    //             longitude: response.body.features[0].center[0],
    //             location: response.body.features[0].place_name

    //         } );  //no error, so set to undefined
    //     }
    // });
};

module.exports = geocode;