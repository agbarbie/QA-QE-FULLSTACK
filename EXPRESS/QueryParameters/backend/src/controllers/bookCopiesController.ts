import { setupAliases } from "import-aliases";
setupAliases();
import { Request, Response } from "express";
import asyncHandler from "@app/middlewares/asyncHandler";
import pool from "@app/db/db.config";

// Get all book copies
export const getBookCopies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM public.bookcopies");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting book copies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single book copy by ID
export const getBookCopyById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { copy_id } = req.params;
    const result = await pool.query("SELECT * FROM public.bookcopies WHERE copy_id = $1", [copy_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book copy not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting book copy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new book copy
export const createBookCopy = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { copy_id,id, inventory_number, condition, status, location } = req.body;

    // Check if the book copy already exists
    const copyCheck = await pool.query("SELECT copy_id FROM bookcopies WHERE copy_id = $1", [copy_id]);
    if (copyCheck.rows.length > 0) {
      res.status(400).json({ message: "Book copy already exists" });
      return;
    }

    // Insert the book copy
    const copyResult = await pool.query(
      "INSERT INTO bookcopies(copy_id, id, inventory_number, condition, status, location) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [copy_id, id, inventory_number, condition, status, location]
    );

    res.status(201).json({
      message: "Book copy successfully created",
      bookCopy: copyResult.rows[0]
    });
  } catch (error) {
    console.error("Error creating book copy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an existing book copy
export const updateBookCopy = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { copy_id } = req.params;
    const { id, inventory_number, condition, status, location } = req.body;

    const checkCopy = await pool.query("SELECT * FROM public.bookcopies WHERE copy_id = $1", [copy_id]);
    if (checkCopy.rows.length === 0) {
      res.status(404).json({ message: "Book copy not found" });
      return;
    }

    const result = await pool.query(
      "UPDATE bookcopies SET id = $2, inventory_number = $3, condition = $4, status = $5, location = $6 WHERE copy_id = $1 RETURNING *",
      [copy_id, id, inventory_number, condition, status, location]
    );

    res.json({ message: "Book copy updated", bookCopy: result.rows[0] });
  } catch (error) {
    console.error("Error updating book copy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a book copy
export const deleteBookCopy = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { copy_id } = req.params;
    const result = await pool.query("DELETE FROM public.bookcopies WHERE copy_id = $1 RETURNING *", [copy_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book copy not found" });
      return;
    }

    res.json({ message: "Book copy deleted successfully" });
  } catch (error) {
    console.error("Error deleting book copy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
