
var Trello = require("node-trello");
var t = new Trello("cfd9ea37d3dc679f24296217894b4d5a", "7afe9685772102ba2d4a0fa609f1c7bed0400c0f48ddb0f4ceee0243d240c207");
var fs = require('fs');


t.get("/1/members/me", function(err, data) {
    if (err) throw err;
    //console.log(data);

    fs.writeFile('output.json', JSON.stringify(data, null, 4), function (err) {
        console.log('File successfully written!');
    })
    //console.log(data.idBoards[1]);

});

// URL arguments are passed in as an object.
t.get("/1/members/me", { cards: "open" }, function(err, data) {
    if (err) throw err;
    //console.log(data);

    fs.writeFile('output.json', JSON.stringify(data, null, 4), function (err) {
        console.log('File successfully written!');
    })

});


