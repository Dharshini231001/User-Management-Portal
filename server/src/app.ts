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
const possiblePaths = [
  path.join(__dirname, '../../client/user_management_portal/build'),
  path.join(__dirname, '../../../client/user_management_portal/build'),
  path.join(__dirname, '../../../../client/user_management_portal/build'),
];

let buildPath = '';
const fs = require('fs');

for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    buildPath = p;
    console.log('Found build at:', buildPath);
    break;
  }
}

if (buildPath) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.error('Build folder not found! Checked:', possiblePaths);
}


export default app;
