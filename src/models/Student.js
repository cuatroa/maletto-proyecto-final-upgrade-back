const mongoose = require('mongoose');

// Creamos un esquema para proteger la información que guardamos
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    bootcamp: { type: String, required: true, minlength: 4 },
    studentId: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 4,
    },
  },
  {
    timestamps: true,
  }
);

// Creamos un modelo usando el esquema y lo exportamos
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
