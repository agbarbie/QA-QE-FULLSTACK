import { Request, Response } from "express";
import pool from "@app/db/db.config";
import bcrypt from "bcryptjs";
import { generateApartmentToken } from "@app/utils/helpers/generateTokens";
import asyncHandler from "@app/middlewares/asyncHandler";

// Register a property manager
export const registerManager = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    
    const existingManager = await pool.query("SELECT email FROM managers WHERE email = $1", [email]);
    if (existingManager.rows.length > 0) {
        res.status(400).json({ message: "Manager already exists" });
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newManager = await pool.query(
        "INSERT INTO managers (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
    );
    
    generateApartmentToken(res, newManager.rows[0].manager_id, "cityStateValue");
    
    res.status(201).json({
        message: "Manager registered successfully",
        manager: { manager_id: newManager.rows[0].manager_id, name: newManager.rows[0].name, email: newManager.rows[0].email }
    });
});

// Login a property manager
export const loginManager = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const managerQuery = await pool.query("SELECT * FROM managers WHERE email = $1", [email]);
    if (managerQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    
    const manager = managerQuery.rows[0];
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    
    generateApartmentToken(res, manager.manager_id, "cityStateValue");
    
    res.status(200).json({
        message: "Login successful",
        manager: { manager_id: manager.manager_id, name: manager.name, email: manager.email }
    });
});

// Logout manager
export const logoutManager = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0)
    });
    res.status(200).json({ message: "Manager logged out successfully" });
});
