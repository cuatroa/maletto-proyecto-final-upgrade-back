const mongoose = require('mongoose');

// Creamos un esquema para proteger la información que guardamos
const bookingSchema = new mongoose.Schema(
  { // Información que bebe del otro módulo 
    arrive: { type: String, required: true, minlength: 1 },
    departure: { type: String, required: true, minlength: 8 },
    price: { type: Number, required: true, minlength: 2 , maxlength: 3 }
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const  Booking = mongoose.model('Booking',  bookingSchema);
module.exports =  Booking;
