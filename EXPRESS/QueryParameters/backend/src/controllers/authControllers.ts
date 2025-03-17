import { setupAliases } from "import-aliases";
setupAliases();

import { Request, Response, NextFunction } from "express";
import pool from "@app/db/db.config";
import bcrypt from 'bcryptjs';
import { generateToken } from "@app/utils/helpers/generateTokens";
import asyncHandler from "@app/middlewares/asyncHandler";
import { RoleRequest } from "@app/utils/types/user_RoleTypes";
import { UserRequest } from "@app/utils/types/userTypes";
export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role_id } = req.body;
    
    // Check if user exists
    const userExists = await pool.query("SELECT email FROM users WHERE email = $1", [email]);
    
    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    
    // Hash the password before inserting into users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert into user table
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, hashedPassword, role_id]
    );
    
    // Generate JWT token for user access - FIXED: using user_id instead of id
    generateToken(res, newUser.rows[0].user_id, newUser.rows[0].role_id);
    
    // Remove password from the returned user object for security
    const userToReturn = { ...newUser.rows[0] };
    delete userToReturn.password;
    
    res.status(201).json({
        message: "User registered successfully",
        user: userToReturn
    });
});

export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    // Check if user exists
    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.id, users.name, users.email, users.password, users.role_id, user_roles.role_name
         FROM users
         JOIN user_roles ON users.role_id = user_roles.id
         WHERE email = $1`,
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //query the user  
    const user = userQuery.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //generate JWT token 
    await generateToken(res, user.id, user.role_id);
    // await console.log("😐😐", req.cookies)


    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        }
    });

    //next();
}) 


export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //We need to immedietly invalidate the access token and the refreh token 
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.status(200).json({ message: "User logged out successfully" });
});

