module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM("active", "inactive"),
            defaultValue: "active"
        }
        },
            {
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