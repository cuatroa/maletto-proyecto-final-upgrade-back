const mongoose = require('mongoose');

// Creamos un esquema para proteger la información que guardamos
const userSchema = new mongoose.Schema(
  {
    img: { type: String, required: true } ,
    name: { type: String, required: true, minlength: 1 },
    lastname: { type: String, required: true, minlength: 1 } ,
    // nickname: { type: String, required: true, minlength: 1 , unique: true }
    adress: { type: String, required: true, minlength:10 , maxlength: 100 } ,
    email: { type: String, required: true, minlength: 1 } , //Poner @ como requerido --
    birthdate: { type: String, required: true, mainlength: 10 } ,  //generar un desplegable -- predefi
    password: { type: String, required: true, minlength: 4 }, //Token -- Video Dalio -- 
    host: { type: Boolean , required: true } ,
    telephone: {type: Number, minlength: 9 , maxlength: 15 }   
  },
  {
    timestamps: true,
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const User = mongoose.model('User', userSchema);
module.exports = User;
