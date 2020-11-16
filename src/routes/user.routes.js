const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fileMiddleware = require('../middlewares/file.middleware');
const passport = require('passport');
const { uploadToCloudinary } = require('../middlewares/file.middleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const SECRET = "Maletto2020"

const router = express.Router(); //Se crean los caminos de rutas

//hace alusión al userController -- Trae todos los Users --
//req (lo que le usuario manda), res(objeto que tiene funciones y responde al enpoint-router), next(la function se comporta como un middleware-encadenando las rutas)
router.get('/', (req, res, next) => {
  User.find()
    .populate(['locationSpaces', 'bookings'])
    .exec()
    .then((users) => {
      //sale respuesta ok
      res.status(200).json(users);
    })
    .catch((error) => {
      //sale respuesta kaogit
      res.status(500).json(error.message);
    });
});

//getbyid - post - put - delete
//seeds - llenar los datos

router.get('/:id', (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .populate(['locationSpaces', 'bookings'])
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

/**
 * Se hace alusión a los Middleware en el post
 * function single() = nos permite indicar la subida del archivo
 * Se alude al avatar, por si deseamos generar un icono a cada usuario en caso de no ser requerida la img --
 * También se puede poner picture para que se guarde en la carpeta uploads
 * */

router.post(
  '/',
  [fileMiddleware.upload.single('img'), uploadToCloudinary],
  async (req, res) => {
    console.log(req.file);

    const img = req.file_url || null;

    const userProperties = {
      name: req.body.name,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: req.body.password,
      guardian: req.body.guardian, // o falso!
      telephone: req.body.telephone,
    };

    //Con este bucle se solicita la img sin ser requerido
    if (img) {
      userProperties.img = img;
    }

    const userInstance = new User(userProperties);

    userInstance
      .save()
      .then(() => {
        res.status(201).send(userInstance);
      })
      .catch((err) => {
        res.status(422).json(err.message);
      });
  }
);

router.put('/:id', [fileMiddleware.upload.single('img'), uploadToCloudinary],
async (req, res) => {
  const id = req.params.id; // 5f994b254025b0facece4fb4

  const img = req.file_url || null;

  const changes = {
    name: req.body.name,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    birthDate: req.body.birthDate,
    password: req.body.password,
    guardian: req.body.guardian, // o falso!
    telephone: req.body.telephone,
  };
  if (img) {
    changes.img = img;
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

// router.post(
//   '/register',
//   [fileMiddleware.upload.single('img'), uploadToCloudinary],
//   async (req, res) => {
//     console.log(req.file);

//     const img = req.file_url || null;

//     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//       if (err) {
//         return res.status(500).send("ERROR")
//       }

//     const userProperties = {
//       name: req.body.name,
//       lastName: req.body.lastName,
//       address: req.body.address,
//       email: req.body.email,
//       birthDate: req.body.birthDate,
//       password: hash,
//       guardian: req.body.guardian, // o falso!
//       telephone: req.body.telephone,
//     };

//     //Con este bucle se solicita la img sin ser requerido
//     if (img) {
//       userProperties.img = img;
//     }

//     const userInstance = new User(userProperties);

//     userInstance
//       .save()
//       .then(() => {
//         res.status(201).send(userInstance);
//       })
//       .catch((err) => {
//         res.status(422).json(err.message);
//       });
//     });
//   }
// );

// router.get('/login/:email/:password', (req, res) => {
//   if (!req.params.email || !req.params.password )
//   {
//     res.status(400).send("Faltan argumentos")
//     return;
//   }
   
//   const email = req.params.email;

//   User.findOne({email : email}, {})
//     .populate(['locationSpaces', 'bookings'])
//     .exec()
//     .then((user) => {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err || !result) {
//           return res.status(500).send("ERROR")
//         }

//         const token = jwt.sign({ userID: user._id }, SECRET , { expiresIn: 60 * 60});

//         res.json({token : token})

//       });      
//     })
//     .catch((error) => {
//       res.status(500).json(error.message);
//     });
// });


module.exports = router;
