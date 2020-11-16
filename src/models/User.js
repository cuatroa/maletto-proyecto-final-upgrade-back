const mongoose = require('mongoose');
// Creamos un esquema para proteger la información que guardamos
const userSchema = new mongoose.Schema(
  {
    img: { type: String }, //se añade por defecto un avatar-añadir url
    name: { type: String },
    lastName: { type: String },
    // nickname: { type: String, required: true, minlength: 1 , unique: true }
    address: { type: String },
    email: { type: String, required: true, unique: true }, //Poner @ como requerido -- input type email--
    birthDate: { type: Date }, //generar un desplegable -- input date --
    password: { type: String, required: true }, //Token -- Video Dalio --
    guardian: { type: Boolean }, //Boolean es para si o no -- en caso de + options string con value(basic/admin..)
    telephone: { type: Number },
    googleId: { type: String },
    //Se crean arrays para almacenar varios Id de otros modelos -- hipervinculación models
    locationSpaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LocationSpace' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], //SOS Cristian
  },
  {
    timestamps: true,
    // Delete the password and googleId when converting to JSON so it never reaches the frontend
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.googleId
      }
    }
  }
);
// Creamos un modelo usando el esquema y lo exportamos
const User = mongoose.model('User', userSchema);
module.exports = User;