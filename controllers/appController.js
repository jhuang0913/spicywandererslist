var express = require("express"),
    passport = require("passport"),
    router = express.Router(),
    db = require("../models");


var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;


var isLoggedIn = function(req, res, next) {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/dashboard");
};
router.get("/", function(req, res) {
    // console.log("profile");
    res.render("index");
});

// router.get("/signup", function(req, res) {
//     res.render("signup");
// });

// router.get("/dashboard", isLoggedIn, function(req, res) {
//     // db.Todo.findAll({}).then(function(dbTodos) {
//     //     var hbsObject = {
//     //         todoList: dbTodos
//     //     };
//     //     res.render("dashboard", hbsObject);
//     res.render('dashboard', {
//         user: req.user
//     });
// });

router.get("/test", function(req, res) {
    // console.log("request: " + req)
    db.Todo.findAll({ include: [db.User] }).then(function(dbTodo) {
        // console.log('dbTodos Query result: ' + dbTodo)
        var hbsObject = {
            todoList: dbTodo
        };
        res.render("test", hbsObject);
    });
});

router.get("/dashboard", function(req, res) {
    console.log("request: ", req.user.id)
    db.User.findOne({ where: { authID: req.user.id } }).then(function(dbUser) {
<<<<<<< HEAD
        db.Todo.findAll({ include: [db.User] }).then(function(dbTodo) {
            // console.log('dbTodos Query result: ', dbTodo);
=======
        db.Todo.findAll({ where: { UserId: dbUser.id }, include: [db.User] }).then(function(dbTodo) {
            // console.log('dbTodos Query result: ' + dbTodo)
>>>>>>> eb7b0367ee94e640cdd426fb317c8472e299b551

            var hbsObject = {
                todoList: dbTodo,
                user: dbUser
            };
            res.render("dashboard", hbsObject);
        });
    });
});

router.post("/add", function(req, res) {
    console.log("add request: " + req.body)
      db.Todo.create({
                name: req.body.name,
                details: req.body.details,
                due_date: req.body.due_date,
                list_name: req.body.list_name,
                UserId: req.body.UserId}
                // ,{include: [ User ]}
                ).then(function(dbTodo) {
          console.log('dbTodos Query result: ' + dbTodo)
    var hbsObject = {
      todoList: dbTodo
    };  
    res.redirect("/dashboard");
});
});

router.delete("/delete/:id", function(req, res) {
    db.Todo.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo){
        var hbsObject = {
      todoList: dbTodo
    };  
    res.redirect("/dashboard");
});
});




// router.post("/signup", passport.authenticate('local-signup', {
//     successRedirect: "/dashboard",
//     failureRedirect: "/signup"
// }));

// router.get("/signin", passport.authenticate('local-signup', {
//     successRedirect: "/dashboard",
//     failureRedirect: "/sigin"
// }));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: "/dashboard"
    }),
    function(req, res) {
        console.log("something", req.user);
        res.json(req.user);
    });










// router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));


router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }));


router.get('/auth/google', function(req, res, next) {
    req.session.redirect = req.query.redirect;
    next();
}, passport.authenticate('google'));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // console.log(req.user);
        // Successful authentication, redirect home.



        res.redirect(req.session.redirect || '/dashboard');
        // delete req.session.redirect;
        // res.redirect('/dashboard');
    });


// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
//     }));

router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
});

router.get("/test", function(req, res) {
    // console.log("request: " + req)
    db.Todo.findAll({ include: [db.User] }).then(function(dbTodo) {
        // console.log('dbTodos Query result: ' + dbTodo)
        var hbsObject = {
            todoList: dbTodo
        };
        res.render("test", hbsObject);
    });
});

module.exports = router;