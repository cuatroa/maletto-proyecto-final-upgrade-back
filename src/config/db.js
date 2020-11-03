const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/Maletto-2020';
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Connected to DB: ${DB_URL}`);
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err.message}`);
  });
