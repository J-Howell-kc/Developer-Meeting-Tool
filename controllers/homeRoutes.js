const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection')

router.get('/', async (req, res) => {
  try {
    // const userData = await User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],
    // });

    //const users = userData.map((project) => project.get({ plain: true }));

    res.render('landing', {
      
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  

  res.render('profile');
});

router.get('/dashboard', (req, res) => {
  

  res.render('dashboard');
});

router.get('/public_profile_view', (req, res) => {
  

  res.render('public_profile_view');
});
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
