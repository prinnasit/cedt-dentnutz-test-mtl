const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  dentistId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Dentist'
  },
  treatment: {
    type: String,
    required: true,
  },
  prescribed_medication: {
    type: String,
    required: true,
  },
  recommendations: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Appointment'
  },
  
});

module.exports = mongoose.model("Report", ReportSchema);
