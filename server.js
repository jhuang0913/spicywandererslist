// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express'),
    handlebars = require("express-handlebars"),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    session = require("express-session"),
    env = require('dotenv').load();

// Sets up the Express App
// =============================================================
var app = express(),
    PORT = process.env.PORT || 8080;

// Static directory
app.use(express.static("./public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport
app.use(session({ secret: "dancingCats", resave: true, saveUninitialized: true })); //Session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

app.use(methodOverride("_method"));

// For Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set public folder
app.use(express.static(process.cwd() + "/public"));

var db = require("./models");

// Routes =============================================================
var routes = require("./controllers/appController.js");
app.use("/", routes);

// Display welcome on homepage
app.get('/', function(req, res) {
    res.send('Welcome!');
});

require("./config/passport/passport.js")(passport, db.user);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function(err, data) {
        if (err) throw err;
        console.log("App is listening on: " + PORT);
    });
}).catch(function(err) {
    if (err) throw err;
    console.log("Site is working!");
});