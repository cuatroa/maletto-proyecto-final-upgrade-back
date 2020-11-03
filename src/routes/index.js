const express = require('express');

const studentsRouter = require('./students');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Server alive!');
});

router.use('/students', studentsRouter);

module.exports = router;
