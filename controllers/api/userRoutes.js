const router = require('express').Router();
const { User, Post } = require('../../models');
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

router.get('/:id', (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: { exclude: ['password']},
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_content', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found" });
          return;
        }
        res.json(dbUserData);
      })
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

router.put("/:id", withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: "No user found"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;