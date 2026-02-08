import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import fieldRoutes from "./routes/fieldRoutes";
import path from "path";
import { fileURLToPath } from "url";  

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);    

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/fields", fieldRoutes);


app.use(express.static(path.join(__dirname, "../client/user_management_portal/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/user_management_portal/build/index.html"));
});

export default app;
