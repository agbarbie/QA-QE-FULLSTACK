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
    const { email, password } = req.body;
    
    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.user_id, users.name, users.email, users.password, users.role_id, user_roles.role_name 
         FROM users 
         JOIN user_roles ON users.role_id = user_roles.role_id 
         WHERE email = $1`,
        [email]
    );
    
    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    
    // Get user from query result
    const user = userQuery.rows[0];
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    
    // Generate JWT token - FIXED: using user_id instead of id
    const token = generateToken(res, user.user_id, user.role_id);
    
    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });

    res.status(200).json({
        message: "Login successful",
        user: {
            // FIXED: using user_id instead of id
            id: user.user_id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        }
    });
    res.cookie("token", token, {httpOnly: true, maxAge:86400000})
    res.redirect("")
});

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

 // Update: Modify an existing user
 export const updateUsers = asyncHandler( async (req: Request, res: Response) => {
    try {
      const {user_id} = req.params;
      const {name,email,password,role_id} =req.body;
  
      const checkUser= await pool.query("SELECT * FROM public.users WHERE user_id = $1", [user_id]);
      if (checkUser.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      } 
      
      const result = await pool.query(
        "UPDATE users SET user_id = $1, name = $2, email = $3, password = $4 ,role_id =$5 WHERE user_id = $1 RETURNING *",
        [user_id, name,email,password,role_id]
      );
      
      res.json({ message: "User updated", user: result.rows[0] });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
   
  // Delete: Remove a user
  export const deleteUser = asyncHandler( async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const result = await pool.query("DELETE FROM public.users WHERE user_id = $1 RETURNING *", [user_id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      } 
      
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
