const express = require('express');
const { findById } = require('../models/Student');

const Student = require('../models/Student');

const router = express.Router();

router.get('/', (req, res) => {
  Student.find()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Student.findById(id)
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post('/', (req, res) => {
  const studentInstance = new Student({
    name: req.body.name,
    bootcamp: req.body.bootcamp,
    studentId: req.body.studentId,
  });

  studentInstance
    .save()
    .then(() => {
      res.status(201).send(studentInstance);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

// http://localhost:3000/students/5f994b254025b0facece4fb4 PUT
router.put('/:id', (req, res) => {
  const id = req.params.id; // 5f994b254025b0facece4fb4

  const changes = {
    name: req.body.name,
    bootcamp: req.body.bootcamp,
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

  // Usando { new: true } hacemos que el .then reciba el estudiante actualizado
  Student.findByIdAndUpdate(id, validChanges, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      res.status(422).json(err.message);
    });
});

// http://localhost:3000/students/5f994b254025b0facece4fb4 DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Student.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send('OK');
    })
    .catch(() => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
