import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address",
    ],
    validate: {
      validator: function (value) {
        return value != null && value.trim() !== "";
      },
      message: "Email cannot be null or empty",
    },
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
