const User = require('./User');
const Appointment = require('./Appointment');

User.hasMany(Appointment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Appointment.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = {User, Appointment};