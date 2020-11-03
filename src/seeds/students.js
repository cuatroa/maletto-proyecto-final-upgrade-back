const mongoose = require('mongoose');

// Importo el modelo de estudiante
const Student = require('../models/Student');

const seedStudents = [
  {
    name: 'Nitin',
    bootcamp: 'FS FT SEPT 2020',
    studentId: '123A'
  },
  {
    name: 'Sami',
    bootcamp: 'FS FT SEPT 2020',
    studentId: '567B'
  },
  {
    name: 'Rosa',
    bootcamp: 'FS FT SEPT 2020',
    studentId: '125C'
  },
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
    await Student.deleteMany({});

    // Dentro de la seed, guardo aquí las cosas en la base de datos
    const studentInstances = seedStudents.map((student) => {
      return new Student(student);
    });

    // Insertamos el array de instancias en la DB
    await Student.insertMany(studentInstances);
    console.log('Hemos terminado de inyectar los estudiantes en la DB');
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err.message}`);
  })
  .finally(() => {
    process.exit(0);
  });
