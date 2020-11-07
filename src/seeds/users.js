const mongoose = require('mongoose');

const User = require('../models/User');

const seedUsers = [
    {
        name : 'Carlos',
        lastName : 'Anegon',
        email : 'carlos@mail.com',
        password : '12345'
    },
    {
        name : 'Laura',
        lastName : 'Lopez',
        email : 'laura@mail.com',
        password : '12345'
    },
    {
        name : 'Rocio',
        lastName : 'Delgado',
        email : 'rocio@mail.com',
        password : '12345'
    },
    {
        name : 'Adrian',
        lastName : 'Andres',
        email : 'adrian@mail.com',
        password : '12345'
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

    await User.deleteMany({});

    const userInstances = seedUsers.map((user) => {

        return new User(user);
    });

    await User.insertMany(userInstances);
    console.log('Hemos terminado de inyectar los users en la DB');
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err.message}`);
  })
  .finally((err) => {
      process.exit(0);
  });
