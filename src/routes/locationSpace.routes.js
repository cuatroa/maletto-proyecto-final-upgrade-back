const express = require('express');
const LocationSpace = require('../models/LocationSpace');
const User = require('../models/User');
const fileMiddleware = require('../middlewares/file.middleware');
const { uploadToCloudinary } = require('../middlewares/file.middleware');


const router = express.Router(); //Se crean los caminos de rutas

//hace alusión al userController -- Trae todos los Users --
//req (lo que le usuario manda), res(objeto que tiene funciones y responde al enpoint-router), next(la function se comporta como un middleware-encadenando las rutas)
router.get('/', (req, res, next) => {
  LocationSpace.find()
    .populate(['user', 'review'])
    .exec()
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
    .populate(['user', 'review'])
    .exec()
    .then((location) => {
      res.status(200).json(location);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

router.post(
  '/',
  [fileMiddleware.upload.single('img'), uploadToCloudinary],
  async (req, res) => {
  if (!req.body.user) {
    res.status(422).json('User field is required');
    return;
  }

  const img = req.file_url || null;

  const payload = {
    location: req.body.location,
    coordinates: req.body.coordinates,
    title: req.body.title,
    availability: req.body.availability,
    capacity: req.body.capacity,
    description: req.body.description,
    type: req.body.type,
    user: req.body.user,
    img: img
  };

  // Tenemos que limpiar los campos NO VÁLIDOS para poderlo guardar
  const validChanges = {};
  // ['name', 'bootcamp']
  Object.keys(payload).forEach((changeKey) => {
    // Si los cambios recogidos del body tienen valor, los añado a validChanges
    if (payload[changeKey]) {
      validChanges[changeKey] = payload[changeKey];
    }
  });

  const locationInstance = new LocationSpace(validChanges);

  locationInstance
    .save()
    .then(() => {
      User.findByIdAndUpdate(req.body.user, {
        $push: { locationSpaces: [locationInstance._id] },
      }).then(() => {
        res.status(201).send(locationInstance);
      });
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

router.put('/:id', [fileMiddleware.upload.single('img'), uploadToCloudinary],
async (req, res) => {
  const id = req.params.id; // 5f994b254025b0facece4fb4

  const img = req.file_url || null;

  const changes = {
    location: req.body.location,
    coordinates: req.body.coordinates,
    title: req.body.title,
    availability: req.body.availability,
    capacity: req.body.capacity,
    description: req.body.description,
    type: req.body.type,
  };
  if (img) {
    changes.img = img
  }

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
