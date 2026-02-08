import mongoose from "mongoose";
import dotenv from "dotenv";
import Field from "../models/field";

dotenv.config();

const fields = [
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  { name: "phone", label: "Phone Number", required: true },
  { name: "email", label: "Email Address", type: "email", required: true }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    await Field.deleteMany();
    await Field.insertMany(fields);
    console.log("Field data seeded");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
