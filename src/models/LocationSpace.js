const mongoose = require('mongoose');

// Creamos un esquema para proteger la información que guardamos
const locationSpaceSchema = new mongoose.Schema(
  {
    location: { type: String, required: true, minlength: 1 },
    coordinates: { type: String, required: true, minlength: 8 },
    img: { type: String, required: true, minlength: 1 } ,
    title: { type: String, required: true, minlength:2 , maxlength: 100 } ,
    date: { type: String, required: true, minlength:2  } , //Poner date -- vinculado con Ruta type Get
    time: { type: Number, required: true } , //
    capacity: { type: Number, required: true, maxlength: 2 } ,  
    description: { type: String, required: true, minlength: 4 , maxlength:200 }, //Token -- Video Dalio -- 
    type: { type: String , required: true } , //desplegable -- desde front se accede a la info de servidor
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const  LocationSpace = mongoose.model('LocationSpace',  locationSpaceSchema);
module.exports =  LocationSpace;
