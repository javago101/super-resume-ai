// server/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import resumeRoutes from './routes/resume.js';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// 👉 ESM style __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});



