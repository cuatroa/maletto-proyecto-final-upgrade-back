const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Creamos un esquema para proteger la información que guardamos
const userSchema = new mongoose.Schema(
  {
    img: { type: String },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    // nickname: { type: String, required: true, minlength: 1 , unique: true }
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //Poner @ como requerido --
    birthDate: { type: Date }, //generar un desplegable -- predefi
    password: { type: String, required: true }, //Token -- Video Dalio --
    guardian: { type: Boolean },
    telephone: { type: Number },
    locationSpaceId: { type: mongoose.Types.ObjectId, ref: "LocationSpace" },
    bookingId: { type: mongoose.Types.ObjectId, ref: "Booking" }, //SOS Cristian
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
