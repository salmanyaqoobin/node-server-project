/**
 * Created by Salman on 11/21/2017.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/_partials");
app.set('view engine', 'hbs');

//Middlewear to check user for login so some other purposes
app.use((req, res, next)=>{
    var log = new Date().toString()+' - '+req.method+' - '+req.url;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (error)=>{
        if(error){
            console.log('unable to store log to file.');
        }
    });
    next();
});

//app.use((req, res, next)=>{
//    var pageOptions = {title:'Maintenance', heading:"Maintenance", body:"Site is under Maintenance, will be get back soon."};
//    res.render('maintenance', pageOptions)
//});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYears', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('capitalIt', (text)=>{
    return text.toUpperCase()
});

app.get('/', (req, res)=>{
    //res.send(
    //    {name: 'salman', likes:
    //        [
    //            'apple', 'cricket', 'chess'
    //        ]
    //    }
    //);
    var pageOptions = {title:'Home Page', heading:"Home Page", body:"Welcome to home page"};
    res.render('home', pageOptions)
});

app.get('/about', (req, res)=>{
   var pageOptions = {title:'About Page', heading:"About Page", body:"Welcome to about page"};
   res.render('about', pageOptions)
});

app.get('/projects', (req, res)=>{
    var pageOptions = {title:'Projects Page', heading:"Projects Page", body:"Welcome to Projects page"};
    res.render('projects', pageOptions)
});

app.get('/bad', (req, res)=>{
    res.send({errorMessage:'Bad Request'});
});

app.listen(port, ()=>{
    console.log('Server is up on '+port+' port');
});
