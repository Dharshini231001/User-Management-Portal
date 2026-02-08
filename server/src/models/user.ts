import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    data: {
      type: Map,
      of: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
