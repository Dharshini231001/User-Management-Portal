import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    data: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
