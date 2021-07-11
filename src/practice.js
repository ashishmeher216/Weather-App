const path = require('path');    //it is a core node module i.e built in module in node
const express = require('express');
// console.log(__dirname);     //current direcctory path
// console.log(__filename);    //current file path


const app = express();  //it does not take any argument,
                        //instead we configure our server by using various methods provided by the application itself
//GET/index.html
app.use(express.static(path.join(__dirname,'../public')));  
/*
The root argument specifies the root directory from which to serve static assets. 
The function determines the file to serve by combining req.url with the provided root directory. 
When a file is not found, instead of sending a 404 response, it instead calls next() to move on to the next middleware, 
allowing for stacking and fall-backs. 
****************************************************************************************************************************/


//app.com
//app.com/help
//app.com/about

//get(route, function to perform a task when someone visit the route)
//  first parameter is request which is coming to the server
// second is a response
app.get('', (req,res)=>{
    res.send('Weather');     //response.send can send back string
});
app.get('/help', (req,res)=>{
    res.send([{                      //response.send can send back JSON, array
        Description: "Help page",
        Purpose: "Answer your queries"
    },
    {                      
        Developer: "Ashish Meher",
        Position: "Chairman"
    }

    ]);          
});
app.get('/about', (req,res)=>{      //response.send can send back HTML
    res.send('<h1 style="color: green;">About page</h2>');
});
app.get('/weather', (req,res)=>{
    res.send({
        Forecast:"This is forecast",
        Location: "This is the location you entered"
    });
});



app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search  term'
        })
    }
    res.send({
        products:[]
    });
});

//app.set(key i.e setting name, value)
app.set('view engine','hbs');   //we can now create dynamic templates using hbs
//when we work with express it expects all the views, in this case the handlebars' temlates to be in a specific folder in root of the project



app.get('', (req,res)=>{
    res.render('index' , {
        title:'Weather',
        name:'Ashish Meher'
    });       //render is used to render handlebars templates
    //it does not need extension to be mentioned
    //also path is not required as all the views are stored in the default root directory
});



//start the server
app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});