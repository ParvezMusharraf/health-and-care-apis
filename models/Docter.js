import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true, // Ensures a user can only be associated with one doctor profile
  },
  specialtyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty',
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  fees: {
    type: Number,
    required: true,
    min: 0,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
});

const doctorModel = mongoose.model("doctor", doctorSchema);
export default doctorModel;
