const sequelize = require = require('../config/connection')
const { User } = require('../models')

const userData = require('./userActive.json')
const populateData = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

populateData();