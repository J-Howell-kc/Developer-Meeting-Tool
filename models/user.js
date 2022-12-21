const { Models, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
    {
        user: {
           type: DataTypes.STRING
        },
        isLoggedIn:{
            type: DataTypes.BOOLEAN
        },

       
    }, 
    {
            
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'User'
          }
)
module.exports = User