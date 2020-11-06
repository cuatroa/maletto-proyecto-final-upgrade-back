const mongoose = require('mongoose');

const LocationSpace = require('../models/LocationSpace');

const seedLocations = [
    {
        location : 'Calle La Luna',
        title : 'El Hall de Rocio',
        description : 'Habitación espaciada a 15 minutos del centro de Madrid y a 5 minutos de la Linea 1.',
    },
    {
        location : 'Calle Pepito Grillo',
        title : 'El Rincón del Vago',
        description : 'Cómodo apartamento en Madrid, estando a 3 minutos del metro, acuerdo con parking privado muy económico.',
    },
    {
        location : 'Calle de Goya',
        title : 'K-tuin',
        description : 'Local comercial dedicado a la venta de artículos originales de la marca Apple.',
    },
    {
        location : 'Calle Hermosa',
        title : 'La Maleta Mágica',
        description : 'Almacén espacioso y limpio, instalaciones recientemente reformadas y modernas, podrás acceder de manera autónoma.',
    }
]

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/Maletto-2020';
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(async () => {
    console.log(`Connected to DB: ${DB_URL}`);

    await LocationSpace.deleteMany({});

    const locationInstances = seedLocations.map((location) => {

        return new LocationSpace(location);
    });

    await LocationSpace.insertMany(locationInstances);
    console.log('Hemos terminado de inyectar las LocationSpaces en la DB');
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err.message}`);
  })
  .finally((err) => {
      process.exit(0);
  });