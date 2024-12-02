import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const SpecialtyModel = mongoose.model('Specialty', specialtySchema);

export default SpecialtyModel;
