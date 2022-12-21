const { Model, DataTypes } =  require('sequelize')
const sequelize = require(`../config/connection`)
//used to check if user is logged in or not to separate from other users
class loggedX extends model{}
loggedX.init (
    {
        user_name:{
            type: Datatypes.INTEGER,
            refrences: {
                model: 'User',
                foreignKey: 'id'
            }
        },
        // to check if this is a user that is logged in 
        isLoggedin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,

        },
        //to check if this is a user that is NOT logged in 
        NotLoggedin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
  {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'loggedX',
     }
)
module.exports = loggedX;