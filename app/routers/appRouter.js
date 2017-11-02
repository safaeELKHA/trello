var passport = require("passport"),
    signupController = require("../controllers/signupController.js"),
    token,secret,
    functions=require('../functions/function'),
    Trello = require("node-trello");

module.exports = function(express) {
  var router = express.Router();
  var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error", "You have to be logged in to access the page.");
    res.redirect("/");
  };

  router.get("/", function(req, res) {
    res.render("home");
  });

  router.get("/form", function(req,res){
    res.render('form')
  });

  router.post("/signup",functions.get);


  router.post("/login", passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
      failureFlash: true
    })
  );

  router.get("/dashboard", isAuthenticated, function(req, res) {
    res.render("dashboard");
  });

  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  return router;
};
