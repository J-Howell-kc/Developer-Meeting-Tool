//Dependencies
const { Profile } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//Routes
router.get('/', (req, res) => {
    Profile.findAll({
        attributes: [
            'id',
            'organization',
            'about',
            'user_id'
        ],
    })
      .then(dbProfileData => {
        const profile = dbProfileData.map(profile => profile.get({ plain: true }));
        res.render('profile', { profile, loggedIn: true });})
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/:id', (req, res) => {
    Profile.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                   'organization',
                   'about',
                   'user_id'
                ],
    })
      .then(dbProfileData => {
        if (!dbProfileData) {
          res.status(404).json({ message: "No profile found" });
          return;
        }
        res.json(dbProfileData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Profile.create({
        organization: req.body.organization,
        about: req.body.about,
        user_id: req.session.user_id
    })
    .then(dbProfileData => res.json(dbProfileData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
    Profile.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbProfileData) => {
            if (!dbProfileData) {
                res.status(404).json({message: "No profile found"});
                return;
            }
            res.json(dbProfileData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Profile.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbProfileData => {
        if (!dbProfileData) {
            res.status(404).json({ message: "No profile found" });
            return;
        }
        res.json(dbProfileData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;