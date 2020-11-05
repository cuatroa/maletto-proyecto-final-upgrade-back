const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const reviewSchema = new mongoose.Schema(
  {
    value: { type: Number }, //Hallar la manera de las estrellas
    dateNow: { type: Date },
    argument: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
