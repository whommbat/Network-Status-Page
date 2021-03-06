var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    config = require('./config/config.js');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.locals.traktUsername = config.traktUsername;
    res.locals.clientIp = '192.168.1.1'; // Change this to actually get the connecting ip
    res.locals.weatherAlwaysDisplay = config.weatherAlwaysDisplay;
    next();
});

// Views
app.use('/', require('./routes/web'));

app.use(function(req, res, next){
    res.status(404).send('Either we lost this page or you clicked an incorrect link!');
});

app.listen(3000, function() {
    console.log('Express server listening on port %s', 3000);
});
