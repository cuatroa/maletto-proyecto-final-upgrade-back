const mongoose = require('mongoose');

// Creamos un esquema para proteger la información que guardamos
const reviewSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true, minlength: 1 , maxlength: 2 }, //Hallar la manera de las estrellas
    dateNow : { type: Date , required: true }, 
    argument: { type: String, required: true, minlength: 1 , maxlength: 400 } 
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const  Review = mongoose.model('Review',  reviewSchema);
module.exports =  Review;
