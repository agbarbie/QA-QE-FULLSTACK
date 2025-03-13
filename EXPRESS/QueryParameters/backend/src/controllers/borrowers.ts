import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../db/db.config";

//Getting all borrowers
export const getBorrower = asyncHandler( async(req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM public.borrowers");
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error getting borrowers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  //Get a single borrower
  export const getBorrowerById = asyncHandler( async(req: Request, res: Response) => {
    try {
      const { borrower_id } = req.params;
      const result = await pool.query("SELECT * FROM public.borrowers WHERE borrower_id = $1", [borrower_id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error getting borrowers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new borrower
  export const createBorrower = asyncHandler( async (req: Request, res: Response) => {
    try {
      const{borrower_id,user_id,id,librarian_id,borrow_date,return_date,status,created_at}=req.body;
      
      // Check if the borrower with this id already exists
      const borrowerCheck = await pool.query("SELECT user_id FROM borrowers WHERE borrower_id = $1", [borrower_id]);
  
      if (borrowerCheck.rows.length > 0) {
        res.status(400).json({
          message: "Borrower already exists"
        });
        return;
      }
      
      // Insert the borrower
      const borrowerResult = await pool.query(
        "INSERT INTO borrowers(borrower_id,user_id,id,librarian_id,borrow_date,return_date,status,created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
        [borrower_id,user_id,id,librarian_id,borrow_date,return_date,status,created_at]
      );
      
      res.status(201).json({
        message: "Borrower successfully created",
        book: borrowerResult.rows[0]
      });
    } catch (error) {
      console.error("Error creating borrower:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update: Modify an existing user
  export const updateBorrower = asyncHandler( async(req: Request, res: Response) => {
    try {
      const {borrower_id} = req.params;
      const {user_id,id,librarian_id,borrow_date,return_date,status,created_at} =req.body;
  
      const checkBorrower= await pool.query("SELECT * FROM public.borrowers WHERE borrower_id = $1", [borrower_id]);
      if (checkBorrower.rows.length === 0) {
        res.status(404).json({ message: "Borrower not found" });
        return;
      } 
      
      const result = await pool.query(
        "UPDATE users SET borrower_id = $1,user_id = $2 ,id = $3,librarian_id = $4,borrow_date = $5,return_date = $6,status = $7,created_at = $8 WHERE borrower_id = $1 RETURNING *",
        [borrower_id,user_id,id,librarian_id,borrow_date,return_date,status,created_at]
      );
      
      res.json({ message: "Borrower updated", user: result.rows[0] });
    } catch (error) {
      console.error("Error updating borrower:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Delete: Remove a borrower
  export const deleteBorrower = asyncHandler( async(req: Request, res: Response) => {
    try {
      const { borrower_id } = req.params;
      const result = await pool.query("DELETE FROM public.borrowers WHERE borrower_id = $1 RETURNING *", [borrower_id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Borrower not found" });
        return;
      } 
      
      res.json({ message: "Borrower deleted successfully" });
    } catch (error) {
      console.error("Error deleting borrower:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
