const express = require("express");
const { findById } = require("../models/User");
const Location = require("../models/LocationSpace");
const Booking = require("../models/Booking");

const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/", (req, res) => {
  const userInstance = new User({
    // name: req.body.name,
    // bootcamp: req.body.bootcamp,
    // userId: req.body.userId,
    img: req.body.img,
    name: req.body.name,
    lastname: req.body.lastname,
    // nickname: { type: String, required: true, minlength: 1 , unique: true }
    adress: req.body.adress,
    email: req.body.email, //Poner @ como requerido --
    birthdate: req.body.birthdate, //generar un desplegable -- predefi
    password: req.body.password, //Token -- Video Dalio --
    host: req.body.host,
    telephone: req.body.telephone,
    // locationSpaceId: req.body.locationSpaceId,
    // bookingId: req.body.locationSpaceId,
  });

  userInstance
    .save()
    .then(() => {
      res.status(201).send(userInstance);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

// http://localhost:3000/students/5f994b254025b0facece4fb4 PUT
router.put("/:id", (req, res) => {
  const id = req.params.id; // 5f994b254025b0facece4fb4

  const changes = {
    name: req.body.name,
    bootcamp: req.body.bootcamp,
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

  // Usando { new: true } hacemos que el .then reciba el estudiante actualizado
  Student.findByIdAndUpdate(id, validChanges, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

// http://localhost:3000/students/5f994b254025b0facece4fb4 DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Student.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch(() => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
