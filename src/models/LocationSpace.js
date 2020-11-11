const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const locationSpaceSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    coordinates: { type: Object },
    img: { type: String },
    title: { type: String, required: true },
    availability: { type: Date }, //Poner date -- vinculado con Ruta type Get
    capacity: { type: Number },
    description: { type: String }, //Token -- Video Dalio --
    type: { type: String }, //desplegable -- desde front se accede a la info de servidor
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const LocationSpace = mongoose.model("LocationSpace", locationSpaceSchema);
module.exports = LocationSpace;
