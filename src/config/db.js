const mongoose = require("mongoose");

const url = process.env.MONGO_ATLAS_URL; //|| 'mongodb://localhost:27017/maleteo-fs-20';

const connectionParams = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//en caso de querer bbdd local:
// const DB_URL =
//   process.env.DB_URL || "mongodb://localhost:27017/fsft-sept-2020";
// mongoose
//   .connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log(`Connected to DB: ${DB_URL}`);
//   })
//   .catch((err) => {
//     console.log(`Error connecting to DB: ${err.message}`);
//   });
