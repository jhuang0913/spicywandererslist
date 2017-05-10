// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
// var routes = require("./routes");
var user = require("./models/user.js");
var http = require("http");
var passport = require("passport");
var passportConfig = require("./config/passport");
var home = require("./models/index.js");
var application = require('./routes/application');
var cookieParser = require('cookie-parser');

SALT_WORK_FACTOR = 12;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());
app.use(express.session({ secret: "password" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// Static directory
app.use(express.static("./public"));
app.set("view", __dirname + "/views");
app.set("port", process.env.PORT || 8080);

// Routes =============================================================
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "../views/index.html"));

});


app.get('/', function(req, res) {
    console.log('Cookies: ', req.cookies)
})


// // Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function(err) {
    if (err) {
        throw err;
    } else {
        db.User.find({ where: { username: 'admin' } }).success(function(user) {
            if (!user) {
                db.User.build({ username: 'admin', password: "admin" }).save();
            };
        })
    }
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});