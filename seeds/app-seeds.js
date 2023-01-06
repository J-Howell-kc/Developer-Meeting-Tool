const sequelize = require('../config/connection')
const { Appointment } = require('../models')

const dbAppointmentData = require('./appointments.json')
const populateData = async () => {
  await sequelize.sync({ force: true });

  await Appointment.bulkCreate(dbAppointmentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

populateData();