const router = require('express').Router();
const { Appointment } = require('../../models');

router.get('/', (req, res) => {
  Appointment.findAll({
  })
    .then(dbAppointmentData => res.json(dbAppointmentData))
    
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
   
});

router.get('/:id', (req, res) => {
  Appointment.findOne({
    where: {
      id: req.params.id
    },})
    .then(dbAppointmentData => {
      if (!dbAppointmentData) {
        res.status(404).json({ message: "No Appointment found" });
        return;
      }
      res.json(dbAppointmentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
  try {
    const newAppointment = await Appointment.create({
      
      title: req.body.title,
      event_name: req.body.event_name,
      start: req.body.start,
      start_time: req.body.start_time,
      description: req.body.description,
      date_created: req.body.date_created,
      location: req.body.location,
      user_id: req.session.user_id

    });

    res.status(200).json(newAppointment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  Appointment.destroy({
      where: {
          id: req.params.id 
      }
  }).then(dbAppointmentData => {
      if (!dbAppointmentData) {
          res.status(404).json({ message: "No appointment found" });
          return;
      }
      res.json(dbAppointmentData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// router.delete('/:id', async (req, res) => {
//   try {
//     const appointmentData = await Appointment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!appointmentData) {
//       res.status(404).json({ message: 'No appointment found with this id!' });
//       return;
//     }

//     res.status(200).json(appointmentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;