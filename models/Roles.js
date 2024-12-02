import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

const roleModel = mongoose.model("Role",roleSchema)
export default roleModel;
