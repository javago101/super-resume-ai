import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "data", "resume.json");

// GET: Load resume
router.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(404).json({ error: "Resume not found." });
    try {
      const resume = JSON.parse(data);
      res.json(resume);
    } catch {
      res.status(500).json({ error: "Failed to parse resume data." });
    }
  });
});

// POST: Save resume
router.post("/", (req, res) => {
  const resume = req.body;
  fs.writeFile(filePath, JSON.stringify(resume, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Failed to save resume." });
    res.json({ success: true });
  });
});

export default router;
