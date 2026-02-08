import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes";
import fieldRoutes from "./routes/fieldRoutes";

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/users", userRoutes);
app.use("/api/fields", fieldRoutes);

// const __dirname = path.resolve();
const buildPath = path.resolve(__dirname, '../../..', 'client/user_management_portal/dist');

console.log('Looking for build at:', buildPath);

const fs = require('fs');
if (fs.existsSync(buildPath)) {
  console.log('✓ Build folder found!');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.error('✗ Build folder not found at:', buildPath);
}


export default app;
