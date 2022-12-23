const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/login', (req, res) => {
  User.findOne({
          where: {
              username: req.body.username
          }
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({
                  message: "Invalid username!"
              });
              return;
          }

          const validPassword = dbUserData.checkPassword(req.body.password);

          if (!validPassword) {
              res.status(400).json({
                  message: "Invalid password!"
              });
              return;
          }

          req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json({
                  user: dbUserData,
                  message: "You are now logged in!"
              });
          });
      });
});

router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router;