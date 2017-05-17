module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        authID: {
            type: Sequelize.STRING
        },
        displayName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM("active", "inactive"),
            defaultValue: "active"
        },
        accessToken: {
            type: Sequelize.STRING,
        }

    }, {
        // We're saying that we want our Users to have Todos
        classMethods: {
            associate: function(models) {
                // Associating Users with Todos
                // When a User is deleted, also delete any associated Todos
                User.hasMany(models.Todo, {
                    onDelete: "cascade"
                });
            }
        }
    }, {
        // We're saying that we want our Users to have Todos
        classMethods: {
            associate: function(models) {
                // Associating Users with Todos
                // When a User is deleted, also delete any associated Todos
                User.hasMany(models.Todo, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return User;







};