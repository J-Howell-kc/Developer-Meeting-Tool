//Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

//Model
Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[1]
        }
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len:[1]
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'profile'
    }
  );

  module.exports = Profile;