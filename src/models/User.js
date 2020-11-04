const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const userSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    // nickname: { type: String, required: true, minlength: 1 , unique: true }
    adress: { type: String, required: true },
    email: { type: String, required: true }, //Poner @ como requerido --
    birthdate: { type: String, required: true }, //generar un desplegable -- predefi
    password: { type: String, required: true }, //Token -- Video Dalio --
    host: { type: Boolean, required: true },
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
