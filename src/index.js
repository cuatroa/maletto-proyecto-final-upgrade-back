require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Me conecto a mongoose importando directamente config/db.js
require('./config/db');

// Sin poner /index es igual que al ponerlo
// const apiRoutes = require('./routes')
const apiRoutes = require('./routes/index');

const server = express();

// Aceptamos peticiones desde cualquier servidor
server.use(cors());
server.use(express.urlencoded({ extended: false }));
// ⬇️ Este middleware se usa para parsear el body
server.use(express.json());

server.use(apiRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
});
