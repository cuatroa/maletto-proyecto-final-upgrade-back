require("dotenv").config(); //Esto carga el contenido de .env
const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./passport"); // Requerimos nuestro archivo de configuración
// Me conecto a mongoose importando directamente config/db.js
require("./config/db");

// Sin poner /index es igual que al ponerlo
// const apiRoutes = require('./routes')
const apiRoutes = require("./routes/index.routes"); //es la puerta de entrada a la apli

const server = express();

// Aceptamos peticiones desde cualquier servidor
server.use(cors());
server.use(express.urlencoded({ extended: false }));
// ⬇️ Este middleware se usa para parsear el body
//No hace falta instalar el body-parser
server.use(express.json());
server.use(passport.initialize());
server.use(express.static("public"));

server.use(apiRoutes); //Es de donde se redireccionan las rutas del proyect

const PORT = process.env.PORT || 3001; //sacamos de la variable de entorno PORT y se asigna a la constante
server.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
});
