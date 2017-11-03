var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Model = require('./model/models.js')

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    function(email, password, done) {
      Model.User.findOne({
        where: {
          'email': email
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' })
        }
        //var hashedPassword = bcrypt.hashSync(password,  user.salt)
        if (user.password === password) {
          return done(null, user)
        }
        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    Model.User.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }
      
      done(null, user)
    })
  })
}