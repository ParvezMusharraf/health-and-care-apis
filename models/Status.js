import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
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

const StatusModel = mongoose.model('Status', statusSchema);

export default StatusModel;
