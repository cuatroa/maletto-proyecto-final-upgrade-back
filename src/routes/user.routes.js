const express = require("express");
const User = require("../models/User");

const router = express.Router(); //Se crean los caminos de rutas

//hace alusión al userController -- Trae todos los Users --
//req (lo que le usuario manda), res(objeto que tiene funciones y responde al enpoint-router), next(la function se comporta como un middleware-encadenando las rutas)
router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
        //sale respuesta ok
        res.status(200).json(users);
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
  
    User.findById(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  });

router.post('/', (req, res) => {
    const userInstance = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        birthDate: req.body.birthDate,
        password: req.body.password,
        guardian: req.body.guardian, // o falso!
        telephone: req.body.telephone
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

router.put('/:id', (req, res) => {
    const id = req.params.id; // 5f994b254025b0facece4fb4
  
    const changes = {
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        birthDate: req.body.birthDate,
        password: req.body.password,
        guardian: req.body.guardian, // o falso!
        telephone: req.body.telephone
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

    User.findByIdAndUpdate(id, validChanges, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send('User deleted!');
      })
      .catch(() => {
        res.status(500).json(err.message);
      });
  });
  
module.exports = router;