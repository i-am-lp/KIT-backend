import express from "express";
import knex from "knex";
import knexConfig from "../knexfile.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
  const upload = multer({ storage });


dotenv.config();

const router = express.Router();
const db = knex(knexConfig.development);


router.post("/new", upload.single("image"), async (req, res) => {
    const { update_text, question, user_id, name } = req.body;
    const imagePath = req.file ? req.file.path : null;
  
    try {
      if (!update_text || !question || !user_id || !name) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const [newUpdateId] = await db("newsletter").insert({
        name,
        user_id,
        update_text,
        question,
        image: imagePath, 
      });
  
      return res.status(201).json({ message: "Update added successfully", id: newUpdateId });
    } catch (error) {
      console.error("Error adding update:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
  

export default router;
