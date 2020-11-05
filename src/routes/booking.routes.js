const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router(); //Se crean los caminos de rutas

router.get('/', (req, res, next) => {
    Booking.find()
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
        .then((booking) => {
          res.status(200).json(booking);
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    });
  
  router.post('/', (req, res) => {
      const bookingInstance = new Booking({
          arriveDate: req.body.arriveDate,
          departureDate: req.body.departureDate,
          price: req.body.price,
          //TRAER USER Y LOCATION
      });
  
      bookingInstance
      .save()
      .then(() => {
        res.status(201).send(bookingInstance);
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
        price: req.body.price,
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


