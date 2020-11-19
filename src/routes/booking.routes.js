const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');

const router = express.Router(); //Se crean los caminos de rutas
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get('/', (req, res, next) => {
  Booking.find()
  .populate(["user", "locationSpace"])
  .exec()
    .then((bookings) => {
      //sale respuesta ok
      res.status(200).json(bookings);
    })
    .catch((error) => {
      //sale respuesta kao
      res.status(500).json(error.message);
    });
});

//getbyid - post - put - delete
//seeds - llenar los datos

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Booking.findById(id)
    .populate(["user", "locationSpace"])
    .exec()
    .then((booking) => {
      res.status(200).json(booking);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

// Ejemplo de Body
// {
//   "arriveDate": "Tue Nov 10 2020 13:04:49 GMT+0100 (hora estándar de Europa central)",
//   "departureDate": "Tue Nov 10 2020 15:04:49 GMT+0100 (hora estándar de Europa central)",
//   "price": 100,
//   "user": "5faa7a0b9add2d1f992fcdde",
//   "guardian": "5faa7a0b9add2d1f992fcddd",
//   "locationSpace": "5faa8115b8bb4853bea83dda"
// }
router.post('/', [isAuthenticated], (req, res) => {
  // const guardian = req.body.guardian;
  const locationSpace = req.body.locationSpace;



  const payload = {
    arriveDate: req.body.arriveDate,
    departureDate: req.body.departureDate,
    amount: req.body.amount,
    user: req.user._id,
    // guardian,
    locationSpace: req.body.locationSpace,
  };

  const validChanges = {};

  Object.keys(payload).forEach((changeKey) => {

    if (payload[changeKey]) {
      validChanges[changeKey] = payload[changeKey];
    }
  });
  
  const bookingInstance = new Booking(validChanges);

  bookingInstance
    .save()
    .then(() => {
      User.findByIdAndUpdate(req.user._id, {
        $push: { bookings: [bookingInstance._id] }
      }).then(() => {
      res.status(201).send(bookingInstance);
      });
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id; // 5f994b254025b0facece4fb4

  const changes = {
    arriveDate: req.body.arriveDate,
    departureDate: req.body.departureDate,
    amount: req.body.amount,
    //TRAER USER Y LOCATION
  };

  // Tenemos que limpiar los campos NO VÁLIDOS para poderlo guardar
  const validChanges = {};

  // ['name', 'bootcamp']
  Object.keys(changes).forEach((changeKey) => {
    // Si los cambios recogidos del body tienen valor, los añado a validChanges
    if (changes[changeKey]) {
      validChanges[changeKey] = changes[changeKey];
    }
  });

  Booking.findByIdAndUpdate(id, validChanges, { new: true })
    .then((updatedBooking) => {
      res.status(200).json(updatedBooking);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Booking.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send('Booking deleted!');
    })
    .catch(() => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
