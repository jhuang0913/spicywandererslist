var express = require("express"),
    passport = require("passport"),
    router = express.Router(),
    db = require("../models");


var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signin");
};
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.get("/dashboard", isLoggedIn, function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
        console.log(dbUser);

        var hbsObject = {

            user: dbUser
        };
        res.render("dashboard", hbsObject);
    })

});


router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
}));

router.get("/signin", passport.authenticate('local-signup', {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
}));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }));

router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
});


// router.get("/signin", function(req, res) {
//     res.render("signin");
// });

module.exports = router;