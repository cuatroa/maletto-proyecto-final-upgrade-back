const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const reviewSchema = new mongoose.Schema(
  {
    value: { type: Number }, //Hallar la manera de las estrellas
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    locationSpace:{ type: mongoose.Schema.Types.ObjectId, ref: "LocationSpace" },
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- se comparte con front
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
