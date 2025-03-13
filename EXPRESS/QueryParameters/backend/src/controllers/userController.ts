import { Request, Response } from "express"
import pool from "../db/db.config"
import asyncHandler from "../middlewares/asyncHandler"

//Getting all users
export const getUsers = asyncHandler( async  (req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM public.users");
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  //Get a single user
  export const getUserById = asyncHandler( async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const result = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [user_id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a new user
  export const createUser = asyncHandler( async  (req: Request, res: Response) => {
    try {
      const{user_id,name,email,password,role_id}=req.body;
      
      // Check if the user with this id already exists
      const userCheck = await pool.query("SELECT user_id FROM users WHERE user_id = $1", [user_id]);
  
      if (userCheck.rows.length > 0) {
        res.status(400).json({
          message: "User already exists"
        });
        return;
      }
      
      // Insert the user
      const userResult = await pool.query(
        "INSERT INTO users(user_id,name,email,password,role_id) VALUES($1, $2, $3, $4, $5) RETURNING *", 
        [user_id,name,email,password,role_id]
      );
      
      res.status(201).json({
        message: "User successfully created",
        book: userResult.rows[0]
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
  