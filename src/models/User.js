const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Creamos un esquema para proteger la información que guardamos
const userSchema = new mongoose.Schema(
  {
    img: { type: String }, //se añade por defecto un avatar-añadir url
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    // nickname: { type: String, required: true, minlength: 1 , unique: true }
    address: { type: String },
    email: { type: String, required: true, unique: true }, //Poner @ como requerido -- input type email--
    birthDate: { type: Date }, //generar un desplegable -- input date --
    password: { type: String, required: true }, //Token -- Video Dalio --
    guardian: { type: Boolean }, //Boolean es para si o no -- en caso de + options string con value(basic/admin..)
    telephone: { type: Number },
    //Se crean arrays para almacenar varios Id de otros modelos -- hipervinculación models
    locationSpaces: [
      { type: mongoose.Schema.Types.ObjectId, ref: "LocationSpace" },
    ],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], //SOS Cristian
  },
  {
    timestamps: true,
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const User = mongoose.model("User", userSchema);
module.exports = User;

// REVISAR INICIO DE SESIÓN CON REDES SOCIALES
// REVISAR MENSAJES ENTRE USUARIOS
// REVISAR BCRYPT!
