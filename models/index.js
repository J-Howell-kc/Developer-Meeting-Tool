const User = require('./User');
const Appointment = require('./Appointment');
const Post = require('./Post');
const Comment = require('./Comment');
const Profile = require('./Profile');

User.hasMany(Appointment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Appointment.belongsTo(User, {
    foreignKey: 'user_id'
  });

User.hasMany(Post, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

User.hasOne(Profile, {
    foreignKey: 'user_id',
  });
  
Profile.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {User, Post, Comment, Appointment, Profile};