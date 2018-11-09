const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

//Global Variable
let port = 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    let now = new Date().toString();
    let logInfo = `${now} : ${req.method} ${req.url}`;
    console.log(logInfo);
    fs.appendFile('server.log', logInfo + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
    });
});

app.listen(port, () => {
    console.log(`Server Ready! Port : ${port}`);
});