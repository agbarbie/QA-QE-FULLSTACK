import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../db/db.config";

//Getting all user_roles
export const getUserRoles = asyncHandler( async (req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM public.user_roles");
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error getting user_roles:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  //Get a single user_role
  export const getUserRoleById = asyncHandler( async (req: Request, res: Response) => {
    try {
      const { role_id } = req.params;
      const result = await pool.query("SELECT * FROM public.user_roles WHERE role_id = $1", [role_id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User_role not found" });
        return;
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error getting user_roles:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new user_role
  export const createUserRole = asyncHandler( async (req: Request, res: Response) => {
    try {
      const{role_id, role_name}=req.body;
      
      // Check if the user_role with this id already exists
      const user_roleCheck = await pool.query("SELECT role_id FROM user_roles WHERE role_id = $1", [role_id]);
  
      if (user_roleCheck.rows.length > 0) {
        res.status(400).json({
          message: "User_role already exists"
        });
        return;
      }
      
      // Insert the user_role
      const user_roleResult = await pool.query(
        "INSERT INTO user_roles(role_id,role_name) VALUES($1, $2) RETURNING *", 
        [role_id,role_name]
      );
      
      res.status(201).json({
        message: "User_role successfully created",
        book: user_roleResult.rows[0]
      });
    } catch (error) {
      console.error("Error creating user_role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update: Modify an existing user_role
  export const updateUserRole = asyncHandler( async (req: Request, res: Response) => {
    try {
      const {role_id} = req.params;
      const {role_name} = req.body;
  
      const checkUser_role= await pool.query("SELECT * FROM public.user_roles WHERE role_id = $1", [role_id]);
      if (checkUser_role.rows.length === 0) {
        res.status(404).json({ message: "User_role not found" });
        return;
      } 
      
      const result = await pool.query(
        "UPDATE user_roles SET role_id = $1, rolename = $2 WHERE role_id = $1 RETURNING *",
        [role_id,role_name]
      );
      
      res.json({ message: "User_role updated", user_role: result.rows[0] });
    } catch (error) {
      console.error("Error updating user_role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Delete: Remove a user_role
  export const deleteUserRole = asyncHandler( async( req: Request, res: Response) => {
    try {
      const { role_id } = req.params;
      const result = await pool.query("DELETE FROM public.user_roles WHERE role_id = $1 RETURNING *", [role_id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User_role not found" });
        return;
      } 
      
      res.json({ message: "User_role deleted successfully" });
    } catch (error) {
      console.error("Error deleting user_role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });