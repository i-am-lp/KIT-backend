import express from "express";
import knex from "knex";
import bcrypt from "bcrypt";
import knexConfig from "../knexfile.js";

const router = express.Router();
const db = knex(knexConfig);

router.post("/login/register", async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address format." });
        }

        const existingUser = await db("user").where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db("user").insert({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await db("user").where({ email }).first();

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        return res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});


export default router;
