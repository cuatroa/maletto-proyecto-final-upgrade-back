const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const locationSpaceSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    coordinates: { type: String, required: true },
    img: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true }, //Poner date -- vinculado con Ruta type Get
    time: { type: Number, required: true }, //
    capacity: { type: Number, required: true },
    description: { type: String, required: true }, //Token -- Video Dalio --
    type: { type: String, required: true }, //desplegable -- desde front se accede a la info de servidor
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    reviewId: { type: mongoose.Types.ObjectId, ref: "Review" },
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const LocationSpace = mongoose.model("LocationSpace", locationSpaceSchema);
module.exports = LocationSpace;
