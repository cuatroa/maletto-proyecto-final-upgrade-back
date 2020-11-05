const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

router.get('/', (req, res, next) => {
    Review.find()
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
        .then((review) => {
          res.status(200).json(review);
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    });
  
  router.post('/', (req, res) => {
      const reviewInstance = new Review({
          value: req.body.value,
          comment: req.body.comment,
          //TRAER USER Y LOCATION

      });
  
      reviewInstance
      .save()
      .then(() => {
        res.status(201).send(reviewInstance);
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
