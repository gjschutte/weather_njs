/*
** Server.js
** Simple weather application with node.js
*/

const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
const apiKey = 'e23b02c9fd9a90ccb44df46cb9af0757';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    console.log(url);
    request(url, function (err, response, body) {
        console.log("error: ", err);
        if (err) {
            res.render('index', {weather:null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            console.log(weather);
            if (weather.main == undefined) {
                res.render ('index', {weather: null, error: 'Error, please try again'})
            } else {
                let weatherText = `It is ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error:null});
            }
        }
    });
})

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})