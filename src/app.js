const path = require('path');    //it is a core node module i.e built in module in node
const express = require('express');
const hbs = require('hbs');
const app = express();  //it does not take any argument,
                        //instead we configure our server by using various methods provided by the application itself
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');



//Paths for Express configuration
const publicDirPath = path.join(__dirname,'../public');
const viewsDirPath = path.join(__dirname,'../templates/views');
const patialsDirPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(patialsDirPath);                  //hbs.registerPartial('partial_name', 'partial value'); 


//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req,res)=>{
    res.render('index' , {
        title:'Weather',
        name:'Ashish Meher',
        company:'AsKMe.pvt.ltd',
        description:'Use this app to know the real-time weather of places'
    });       //render is used to render handlebars templates
    //it does not need extension to be mentioned
    //also path is not required as all the views are stored in the default root directory
});

app.get('/about', (req,res)=>{
    res.render('about' , {
        title:'About Me',
        description:'We provide you real time weather data of a location for free.',
        company:'AsKMe.pvt.ltd'
    });
});

app.get('/help', (req,res)=>{
    res.render('help' , {
        title:'Need help?',
        description:'We answer all your queries',
        company:'AsKMe.pvt.ltd'
    });
});

//use wildcard character * at the end to serve an error message in case the link does not match any predefined links
app.get('/help/*', (req,res)=>{
    res.render('404error' , {
        errorMessage:'404 : Page not found',
        description:'Please type a valid url',
        company:'AsKMe.pvt.ltd'
    });
});
app.get('/about/*', (req,res)=>{
    res.render('404error' , {
        errorMessage:'404 : Page not found',
        description:'Please type a valid url',
        company:'AsKMe.pvt.ltd'
    });
});
// app.get('*', (req,res)=>{
//     res.render('404error' , {
//         errorMessage:'404 : Page not found',
//         description:'Please type a valid url',
//         company:'AsKMe.pvt.ltd'
//     });
// });

/**************************************************************************************************************
Make sure that you have written app.set('view engine', 'hbs') and have made a folder views in your parent folder 
and after that run node src/app.js or whatever but run from you parent folder.

This will not be going to work if you go to the src folder and after that run node app.js 
because it will search for the views in the src folder.
***************************************************************************************************************/



app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must mention an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {} )=>{
        if(error){
            return res.send({error});
        }
        // console.log(latitude , longitude , location);
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     Forecast:"This is forecast",
    //     Location: "This is the location you entered",
    //     address:req.query.address
    // });
});

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[],
        queries: req.query
    });
});
//start the server
app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});