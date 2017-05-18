var bCrypt = require("bcrypt-nodejs");
var configAuth = require("../auth.js");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var db = require("../../models");
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//console.log(db.User);

module.exports = function(passport, user) {

    passport.serializeUser(function(user, done) {
        console.log("console log serialize User: " + user)
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        // console.log("console log deserialzeUser: " + id)

        // db.User.findById(id).then(function(user) {
        //     if (user) {
        //         done(null, user.get());

        //     } else {
        //         done(user.errors, null);
        //     }
        // });

        done(null, obj);
    });

    // passport.use('local-signup', new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true //allows us to pass back the entire request to the callback
    //     },
    //     // Callback function 
    //     function(req, email, password, done) {

    //         // Hashed password
    //         var generateHash = function(password) {
    //             return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    //         };


    //         // Use Sequelize User model to check if user already exists, if not we add them
    //         db.User.findOne({
    //             where: {
    //                 email: email
    //             }
    //         }).then(function(user) {
    //             if (user) {
    //                 return done(null, false, {
    //                     message: "That email is already taken"
    //                 });
    //             } else {
    //                 var userPassword = generateHash(password);

    //                 var data = {

    //                     password: userPassword,
    //                     firstName: req.body.firstName,
    //                     lastName: req.body.lastName
    //                 };

    //                 //User.create() creates a new entry in the database
    //                 db.User.create(data).then(function(newUser, created) {
    //                     if (!newUser) {
    //                         return done(null, false);
    //                     }
    //                     if (newUser) {
    //                         return done(null, newUser);
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // ));

    // //LOCAL SIGNIN
    // passport.use('local-signin', new LocalStrategy(

    //     {

    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true // allows us to pass back the entire request to the callback
    //     },

    //     function(req, email, password, done) {

    //         // var User = user;

    //         var isValidPassword = function(userpass, password) {
    //             return bCrypt.compareSync(password, userpass);
    //         }

    //         db.User.findOne({ where: { email: email } }).then(function(user) {

    //             if (!user) {
    //                 return done(null, false, { message: 'Email does not exist' });
    //             }

    //             if (!isValidPassword(user.password, password)) {

    //                 return done(null, false, { message: 'Incorrect password.' });

    //             }

    //             var userinfo = user.get();
    //             console.log("This logs the user info" + userinfo)
    //             return done(null, userinfo);

    //         }).catch(function(err) {

    //             console.log("Error:", err);

    //             return done(null, false, { message: 'Something went wrong with your Signin' });


    //         });

    //     }
    // ));



    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
            // console.log(profile);
            //cb(null, profile);
            db.User.findOrCreate({ where: { authID: profile.id }, raw: true, defaults: { displayName: profile.displayName } }).spread(function(user, created) {
                console.log("this console logs the FB stuff" + created, user.get());

                return cb(null, user);

            });

        }


    ));


    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL

        },
        function(accessToken, refreshToken, profile, cb) {
            // console.log(profile);

            db.User.findOrCreate({ where: { authID: profile.id }, defaults: { displayName: profile.displayName } }).spread(function(user, created) {
                // console.log("We want to know!" + user);
                return cb(null, profile);
            });





        }
    ));


};