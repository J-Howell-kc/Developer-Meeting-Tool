const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboard-routes')
const messageboardRoutes = require('./messageboard-routes')
const profileRoutes = require ('./profile-routes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/messageboard', messageboardRoutes);
router.use('/profiles', profileRoutes);

module.exports = router;
