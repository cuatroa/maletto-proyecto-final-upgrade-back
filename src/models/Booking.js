const mongoose = require("mongoose");

// Creamos un esquema para proteger la información que guardamos
const bookingSchema = new mongoose.Schema(
  {
    arriveDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    price: { type: Number },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    guardianId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, //marca del tiempo de ejecución -- Cristian :) --SOS
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
