module.exports = function(sequelize, Sequelize){
    var Todo = sequelize.define("Todo", 
        {
            name: {
                type:Sequelize.STRING,
                allowNull: false
            },

            details: {
                type:Sequelize.TEXT,
                allowNull: false
            },
            due_date: {
                type:Sequelize.DATEONLY,
                allowNull: false
                //Needs Validation and calendar picker on front end
            },
            invitees: {
                type:Sequelize.STRING
                //Needs Validation for email?
            },
            list_name: {
                type:Sequelize.STRING,
                allowNull: false
                //Should this have a default value?
            },
            repeating: {
                type:Sequelize.BOOLEAN
                //Do we need another column to handle the type of repeating?
            },
            priority: {
                type:Sequelize.INTEGER
                //We can convert the the integer value to a color system for the front-end
            },
            email_notifications: {
                //Simple true or false to send email notifcations
                type:Sequelize.BOOLEAN
                
            },
            email_datetime: {
                //Only used if email notifications is true
                type:Sequelize.DATE
            },
            complete: {
                type:Sequelize.BOOLEAN
                //Simple true or false could be used to come back to already completed tasks
            },
            document_repository: {
                //Need to research how to hook up with Amazon Database for this storage
                type:Sequelize.TEXT
            }
        },
            {
      // We're saying that we want our Todo to have a User
        classMethods: {
            associate: function(models) {
            // A User (foreignKey) is required or a Todo can't be made
                Todo.belongsTo(models.User, {
                    foreignKey: {
                    allowNull: false
                    }
                });
            }
        }
    }
    );
    return Todo;
};