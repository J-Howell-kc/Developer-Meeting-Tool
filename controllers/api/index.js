const router = require('express').Router();

const userRoutes = require('./userRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const postRoutes = require('./post-routes')
const commentRoutes = require ('./comment-routes')
const profileRoutes = require ('./profile-routes')

router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)
router.use('/profiles', profileRoutes)

module.exports = router;