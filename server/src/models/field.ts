import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    required: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Field", fieldSchema);
