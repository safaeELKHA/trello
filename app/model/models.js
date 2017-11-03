var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://dbabacus:meknes2018@mytrellotracking.c2qqug8x0jtf.us-west-1.rds.amazonaws.com:5432/trellotracking')

sequelize.authenticate()
    .then(function(){
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.error('Connection failed:', err);
    });


var User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
        },
        salt: {
            type: Sequelize.STRING,
        },
        token: {
            type: Sequelize.STRING,
        }
        , token_secret: {
            type: Sequelize.STRING,
        }
    })

// you can define relationships here
User.sync({force: true});

module.exports.User = User