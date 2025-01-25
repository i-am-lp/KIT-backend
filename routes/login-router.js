import express from "express";
import knex from "knex";
import bcrypt from "bcrypt";
import knexConfig from "../knexfile.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const db = knex(knexConfig.development);
const secretKey = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    console.log("Received data:", { name, email, password });

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
            console.error("Missing email or password");
            return res.status(400).json({ message: "Email and password are required." });
        }

        console.log("Looking for user in database with email:", email);
        const user = await db("user").where({ email }).first();

        if (!user) {
            console.error("User not found for email:", email);
            return res.status(404).json({ message: "User not found." });
        }

        console.log("User found:", user);

        console.log("Comparing passwords");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error("Invalid password for user:", email);
            return res.status(401).json({ message: "Invalid credentials." });
        }

        console.log("Generating JWT token");
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        console.log("Login successful for user:", email);
        return res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});



export default router;
