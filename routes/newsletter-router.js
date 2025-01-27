import express from 'express';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const db = knex(knexConfig.development);

router.get('/', async (req, res) => {
    try {
        const newsletter = await db("newsletter").select("*");
        res.status(200).json(newsletter);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});

router.get('/answers', async (req, res) => {
    try {
        const responses = await db("responses").select("*");
        res.status(200).json(responses);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});

export default router;