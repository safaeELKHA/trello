var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://postgres:123456@192.168.1.22:5432/test')
sequelize.authenticate()
    .then(function(){
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.error('Connection failed:', err);
    });



module.exports = sequelize