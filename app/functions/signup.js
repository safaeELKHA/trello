var Model = require('../model/models.js'),
    token,secret,
    Trello = require("node-trello");

module.exports.signup=function (req,res) {

    var email = req.body.email
    var password = req.body.password
    var password2 = req.body.password2

    console.log(email)
    console.log(password)
    console.log(password2)


    const auth = new Trello.OAuth(
        "cfd9ea37d3dc679f24296217894b4d5a",
        "ddbb42179a6f5d8bd4b9b00fb457d50527fa93c1be97c0869c6f25567f0fa01c",
        "http://13.57.10.169:8888?user=3&",
        "test-abacus"
    );

    console.log("auth", auth);
    const rslt = auth.getRequestToken(function(err, dt) {
        console.log("reslt", dt);
        var token1 = Trello.token();
        token=dt.oauth_token;
        secret=dt.oauth_token_secret;
        console.log('token'+token);
        console.log('secret'+secret);
        console.log('token 11'+token1);


        var newUser = {
            email:email,
            password: password,
            token:token,
            secret:secret,
            token_secret:secret
        }

        Model.User.create(newUser);

        res.redirect(dt.redirect);
    });



}