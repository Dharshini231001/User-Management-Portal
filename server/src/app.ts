import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import fieldRoutes from "./routes/fieldRoutes";

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/users", userRoutes);
app.use("/api/fields", fieldRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/user_management_portal/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/user_management_portal/build/index.html'));
});


export default app;
