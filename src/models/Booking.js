const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const bookingSchema = new mongoose.Schema(
  {
    // arriveDate: { type: Date, required: true },
    // departureDate: { type: Date, required: true },
    // amount: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // guardian: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Aquí no se genera array --solo afecta a un user
    locationSpace:{ type: mongoose.Schema.Types.ObjectId, ref: "LocationSpace" },
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
