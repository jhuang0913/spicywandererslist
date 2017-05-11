module.exports = function(sequelize, DataTypes){
    var Todo = sequelize.define("Todo", 
        {
            name: {
                type:DataTypes.STRING,
                allowNull: false,
            },

            details: {
                type:DataTypes.TEXT,
                allowNull: false,
            },
            due_date: {
                type:DataTypes.DATEONLY,
                allowNull: false,
                //Needs Validation and calendar picker on front end
            },
            invitees: {
                type:DataTypes.STRING
                //Needs Validation for email?
            },
            list_name: {
                type:DataTypes.STRING
                allowNull: false,
                //Should this have a default value?
            },
            repeating: {
                type:DataTypes.BOOLEAN
                //Do we need another column to handle the type of repeating?
            },
            priority: {
                type:DataTypes.INTEGER
                //We can convert the the integer value to a color system for the front-end
            },
            email_notifications: {
                //Simple true or false to send email notifcations
                type:DataTypes.BOOLEAN
                
            },
            email_datetime: {
                //Only used if email notifications is true
                type:DataTypes.DATE
            },
            complete: {
                type:DataTypes.BOOLEAN
                //Simple true or false could be used to come back to already completed tasks
            },
            document_repository: {
                //Need to research how to hook up with Amazon Database for this storage
                type:DataTypes.DATETIME
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