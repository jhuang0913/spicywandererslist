var bcrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());

            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true //allows us to pass back the entire request to the callback
        },
        // Callback function 
        function(req, email, password, done) {

            // Hashed password
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };


            // Use Sequelize User model to check if user already exists, if not we add them
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: "That email is already taken"
                    });
                } else {
                    var userPassword = generateHash(password);

                    var data = {
                        email: email,
                        password: userPassword,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    };

                    //User.create() creates a new entry in the database
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {

            var User = user;

            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({ where: { email: email } }).then(function(user) {

                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, { message: 'Incorrect password.' });

                }

                var userinfo = user.get();

                return done(null, userinfo);

            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });


            });

        }
    ));

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));
}