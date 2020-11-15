const express = require("express");
const LocationSpace = require("../models/LocationSpace");

const router = express.Router(); //Se crean los caminos de rutas

//hace alusión al userController -- Trae todos los Users --
//req (lo que le usuario manda), res(objeto que tiene funciones y responde al enpoint-router), next(la function se comporta como un middleware-encadenando las rutas)
router.get('/', (req, res, next) => {
  LocationSpace.find()
    .then((locations) => {
        //sale respuesta ok
        res.status(200).json(locations);
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
  
    LocationSpace.findById(id)
      .then((location) => {
        res.status(200).json(location);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  });

router.post('/', (req, res) => {

    const locationInstance = new LocationSpace({
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      // img
      title: req.body.title,
      availability: req.body.availability,
      capacity: req.body.capacity,
      description: req.body.description,
      type: req.body.type,
      // TRAER USER Y REVIEW de otros modelos
    });

    locationInstance
    .save()
    .then(() => {
      res.status(201).send(locationInstance);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id; // 5f994b254025b0facece4fb4
  
    const changes = {
        location: req.body.location,
        coordinates: req.body.coordinates,
        // img
        title: req.body.title,
        availability: req.body.availability,
        capacity: req.body.capacity,
        description: req.body.description,
        type: req.body.type
        // TRAER USER Y REVIEW de otros modelos
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

    LocationSpace.findByIdAndUpdate(id, validChanges, { new: true })
    .then((updatedLocation) => {
      res.status(200).json(updatedLocation);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    LocationSpace.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send('Location deleted!');
      })
      .catch(() => {
        res.status(500).json(err.message);
      });
  });
  
module.exports = router;