var bcrypt = require('bcrypt'),
    Model = require('../model/models.js')


module.exports.signup = function(req, res) {
  var username = req.body.username
  var email = req.body.email
  var firstname = req.body.firstname;
  var lastname = req.body.lastname
  var password = req.body.password
  var password2 = req.body.password2
  
  if (!username || !password || !password2) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('signup')
  }
  
  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.")
    res.redirect('signup')
  }
  
  var salt =bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password,salt);
  
  var newUser = {
    username: username,
    email:email,
    firstname:firstname,
    lastname:lastname,
    salt:salt,
    password: hashedPassword
  }
  
  console.log(salt);
  Model.User.create(newUser).then(function() {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  })
}