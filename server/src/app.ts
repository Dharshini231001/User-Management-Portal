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

const fs = require('fs');


const buildPath = path.join(__dirname, '../../client/user_management_portal/dist');

console.log('Current directory:', __dirname);
console.log('Looking for build at:', buildPath);
console.log('Build exists?', fs.existsSync(buildPath));

if (fs.existsSync(buildPath)) {
  console.log('✓ Serving static files from:', buildPath);
  app.use(express.static(buildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.error('✗ Build folder not found!');
  console.log('Files in parent dir:', fs.readdirSync(path.join(__dirname, '../..')));
}

export default app;
