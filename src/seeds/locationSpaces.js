const mongoose = require('mongoose');

const LocationSpace = require('../models/LocationSpace');
const User = require('../models/User');

const seedLocations = [
  {
    location: 'Calle La Luna',
    title: 'El Hall de Rocio',
    description:
      'Habitación espaciada a 15 minutos del centro de Madrid y a 5 minutos de la Linea 1.',
  },
  {
    location: 'Calle Pepito Grillo',
    title: 'El Rincón del Vago',
    description:
      'Cómodo apartamento en Madrid, estando a 3 minutos del metro, acuerdo con parking privado muy económico.',
  },
  {
    location: 'Calle de Goya',
    title: 'K-tuin',
    description:
      'Local comercial dedicado a la venta de artículos originales de la marca Apple.',
  },
  {
    location: 'Calle Hermosa',
    title: 'La Maleta Mágica',
    description:
      'Almacén espacioso y limpio, instalaciones recientemente reformadas y modernas, podrás acceder de manera autónoma.',
  },
];

const DB_URL =
  process.env.MONGO_ATLAS_URL || 'mongodb://localhost:27017/maleteo-fs-20';

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

    // Me traigo todos los users que he creado con la seed anterior npm run seed:users
    const users = await User.find();

    const locationInstances = seedLocations.map((location, index) => {
      // antes de crear la instancia, he metido la id de un usuario que he creado con la seed
      // anterior en el campo user
      const locationProperties = {
        ...location,
        user: users[index]._id,
      };

      return new LocationSpace(locationProperties);
    });

    await LocationSpace.insertMany(locationInstances);
    console.log('Hemos terminado de inyectar las LocationSpaces en la DB');

    // ahora que están guardadas, las asigno de vuelta a sus usuarios.
    for (let user of users) {
      const locationForUser = locationInstances.find((location) => {
        return location.user === user._id;
      });

      // Actualizo cada usuario...
      if (locationForUser) {
        await User.findByIdAndUpdate(user._id, {
          $push: { locationSpaces: [locationForUser._id] },
        });
      }
    }
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err.message}`);
  })
  .finally((err) => {
    process.exit(0);
  });
