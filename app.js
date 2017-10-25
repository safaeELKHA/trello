var express = require("express"),
  app = express(),
  setupHandlebars = require("./app/setupHandlebars.js")(app),
  setupPassport = require("./app/setupPassport"),
  flash = require("connect-flash"),
  appRouter = require("./app/routers/appRouter.js")(express),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  jsonParser = bodyParser.json();

var port = process.env.PORT || 8888;

app.use(cookieParser());
app.use(session({ secret: "456", saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", express.static(__dirname + "/styles"));
//message
app.use(flash());
app.use(function(req, res, next) {
  res.locals.errorMessage = req.flash("error");
  next();
});

setupPassport(app);

app.use("/", appRouter);

// start app
app.listen(port);
console.log("Server started on port " + port);

module.exports.getApp = app;
