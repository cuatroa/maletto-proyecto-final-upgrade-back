const express = require("express");
const User = require("../models/User");

const router = express.Router(); //Se crean los caminos de rutas

//hace alusión al userController -- Trae todos los Users --
//req (lo que le usuario manda), res(objeto que tiene funciones y responde al enpoint-router), next(la function se comporta como un middleware-encadenando las rutas)
router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
        //sale respuesta ok
        res.status(200).json(users);
    })
    .catch((error) => {
        //sale respuesta kao
        res.status(500).json('error cargando usuarios');
    });
});

//getbyid - post - put - delete 
//seeds - llenar los datos
