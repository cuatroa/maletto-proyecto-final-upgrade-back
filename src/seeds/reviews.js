const mongoose = require('mongoose');

// Importo el modelo de estudiante
const Review = require('../models/Review');

const seedReviews = [
  {
    "value" : 4.5,
    "comment" : "Jacob responde rápido y estuvo muy atento. Nos dió muchos consejos sobre Madrid y pudimos hacer turismo tranquilamente. Su ubicación nos vino genial.",
    "user": "5fabccb288fb296090024a84",
    "locationSpace": "5fabcda688fb296090024a85"
  },
  {
    value: 9,
    comment: 'Rocio is very nice and her space is so cozy, she also sowed us the best places to go for tapas in Madrid. Thank you so much.',
  },
  {
    value: 9,
    comment: 'Rocio responde rápido y estuvo muy atenta. Nos dió muchos consejos sobre Madrid y pudimos hacer turismo tranquilamente. Su ubicación nos vino genial.',
  }
];

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/Maletto-2020';
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(async () => {
    console.log(`Connected to DB: ${DB_URL}`);

    // Borramos los estudiantes de la DB
    await Review.deleteMany({});

    // Dentro de la seed, guardo aquí las cosas en la base de datos
    const reviewInstances = seedReviews.map((review) => {
      return new Review(review);
    });

    // Insertamos el array de instancias en la DB
    await Review.insertMany(reviewInstances);
    console.log('Hemos terminado de inyectar las Reviews en la DB');
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err.message}`);
  })
  .finally(() => {
    process.exit(0);
  });
