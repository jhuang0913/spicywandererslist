exports.homepage = function(req, res) {
    res.render("index.html", { myVar: req.user.username })
}