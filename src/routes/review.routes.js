const express = require("express");
const Review = require("../models/Review");
const User = require("../models/User");
const LocationSpace = require("../models/LocationSpace");

const router = express.Router();

router.get('/', (req, res, next) => {
    Review.find()
      .populate(['user', 'locationSpace'])
      .exec()
      .then((reviews) => {
          //sale respuesta ok
          res.status(200).json(reviews);
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
    
      Review.findById(id)
        .populate(['user', 'locationSpace'])
        .exec()
        .then((review) => {
          res.status(200).json(review);
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    });
  
  router.post('/', async (req, res) => {
    const user = req.body.user;
    const locationSpace = req.body.locationSpace;

    if (!user || !locationSpace ) {
      res.status(422).json('User and location fields are required');
      return;
    }

      const payload = {
          value: req.body.value,
          comment: req.body.comment,
          user: user,
          locationSpace: locationSpace,
      };

      const validChanges = {};

      Object.keys(payload).forEach((changeKey) => {

        if (payload[changeKey]) {
          validChanges[changeKey] = payload[changeKey];
        }
      });

      const reviewInstance = new Review(validChanges);
  
      reviewInstance
      .save()
      .then(() => {
        LocationSpace.findByIdAndUpdate(req.body.user, {
          $push: { reviews: [reviewInstance._id] }
        }).then(() => {
        res.status(201).send(reviewInstance);
        });        
      })
      .catch((err) => {
        res.status(422).json(err.message);
      });
  });
  
  router.put('/:id', (req, res) => {
      const id = req.params.id; // 5f994b254025b0facece4fb4
    
      const changes = {
            value: req.body.value,
            comment: req.body.comment,
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
  
      Review.findByIdAndUpdate(id, validChanges, { new: true })
      .then((updatedReview) => {
        res.status(200).json(updatedReview);
      })
      .catch((err) => {
        res.status(422).json(err.message);
      });
  });
  
  router.delete('/:id', (req, res) => {
      const id = req.params.id;
    
      Review.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send('Review deleted!');
        })
        .catch(() => {
          res.status(500).json(err.message);
        });
    });
    
  module.exports = router;

  //¿Cómo incluir ID de User si en User no necesitamos las reviews?S
