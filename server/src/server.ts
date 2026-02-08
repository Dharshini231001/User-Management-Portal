import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb+srv://user_management_portal:Dha%40231001@cluster0.esn4chq.mongodb.net/user_management_portal?retryWrites=true&w=majority' as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);  // ← Fixed this line
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
