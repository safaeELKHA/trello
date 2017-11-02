var passport = require("passport"),
  signupController = require("../controllers/signupController.js");
var Trello = require("node-trello");

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
    res.render('signup')
  });

  router.get("/signup", function(req, res) {
    const auth = new Trello.OAuth(
      "cfd9ea37d3dc679f24296217894b4d5a",
      "ddbb42179a6f5d8bd4b9b00fb457d50527fa93c1be97c0869c6f25567f0fa01c",
      "http://13.57.10.169:8888?user=3&",
      "test-abacus"
    );

    console.log("auth", auth);
    const rslt = auth.getRequestToken(function(err, dt) {
      console.log("reslt", dt);
      res.redirect(dt.redirect);
    });
  });












  router.post("/signup", signupController.signup);
  //
  router.post(
    "/login",
    passport.authenticate("local", {
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
