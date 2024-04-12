const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  patientId: {
    type: ObjectId,
    required: true,
  },
  dentistId: {
    type: ObjectId,
    required: true,
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
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("Report", AppointmentSchema);
