import express from "express";
import knex from "knex";
import knexConfig from "../knexfile.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const db = knex(knexConfig.development);

router.post("/new", async (req, res) => {
  const { name, update_text, image, question, user_id } = req.body;

  try {
    if (!name || !update_text || !question || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [newUpdateId] = await db("newsletter").insert({
      name,
      update_text,
      image,
      question,
      user_id,
    });

    return res.status(201).json({ message: "Update added successfully", id: newUpdateId });
  } catch (error) {
    console.error("Error adding update:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
