import { Request, Response } from "express";
import pool from "../db/db.config"
import asyncHandler from "../middlewares/asyncHandler";
import { RoleRequest } from "../utils/types/user_RoleTypes";

// Get all books with optional filtering
export const getBooks = asyncHandler(  async(req: Request, res: Response) => {
    try {
      const { genre, year, pages, sort } = req.query;
      let query = "SELECT * FROM public.mybooks";
      const queryParams: any[] = [];
      let conditions = [];
      
      // Build WHERE clause with filters
      if (genre && typeof genre === 'string') {
        queryParams.push(genre.toLowerCase());
        conditions.push(`LOWER(genre) = LOWER($${queryParams.length})`);
      }
      
      if (year && typeof year === 'string') {
        const publishYear = parseInt(year);
        if (!isNaN(publishYear)) {
          queryParams.push(publishYear);
          conditions.push(`year >= $${queryParams.length}`);
        }
      }
      
      if (pages && typeof pages === 'string') {
        const minPages = parseInt(pages);
        if (!isNaN(minPages)) {
          queryParams.push(minPages);
          conditions.push(`pages >= $${queryParams.length}`);
        }
      }
      
      // Add WHERE clause if any conditions exist
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
      
      // Add sorting
      if (sort && typeof sort === 'string') {
        switch(sort) {
          case 'title':
            query += " ORDER BY title ASC";
            break;
          case 'author':
            query += " ORDER BY author ASC";
            break;
          case 'year':
            query += " ORDER BY year ASC";
            break;
          case 'pages':
            query += " ORDER BY pages ASC";
            break;
          default:
            query += " ORDER BY id ASC";
        }
      } else {
        query += " ORDER BY id ASC";
      }
      
      console.log("Executing query:", query, queryParams);
      const result = await pool.query(query, queryParams);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error getting books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get single book
  export const getBooksById = asyncHandler(  async(req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM public.mybooks WHERE id = $1", [id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error getting book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a new book
  export const createBooks = asyncHandler(  async (req: Request, res: Response) => {
    try {
      const { id, title, author, genre, year, publisher, pages, price, description, created_by } = req.body;
      
      // Check if the book with this id already exists
      const bookCheck = await pool.query("SELECT id FROM mybooks WHERE id = $1", [id]);
      
      if (bookCheck.rows.length > 0) {
        res.status(400).json({
          message: "Book already exists"
        });
        return;
      }
      
      // Insert the book
      const booksResult = await pool.query(
        "INSERT INTO mybooks(id, title, author, genre, year, publisher, pages, price, description, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", 
        [id, title, author, genre, year, publisher, pages, price, description, created_by]
      );
      
      res.status(201).json({
        message: "Book successfully created",
        book: booksResult.rows[0]
      });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update: Modify an existing book
  export const updateBooks = asyncHandler(  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, author, genre, year, publisher, pages, price, description, image } = req.body;
  
      const checkBook = await pool.query("SELECT * FROM public.mybooks WHERE id = $1", [id]);
      if (checkBook.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      } 
      
      const result = await pool.query(
        "UPDATE mybooks SET title = $1, author = $2, genre = $3, year = $4, publisher = $5, pages = $6, price = $7, description = $8, image=$9, updated_at = NOW() WHERE id = $10 RETURNING *",
        [title, author, genre, year, publisher, pages, price, description, image,id]
      );
      
      res.json({ message: "Book updated", book: result.rows[0] });
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Delete: Remove a book
  export const deleteBooks = asyncHandler(  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM public.mybooks WHERE id = $1 RETURNING *", [id]);
      
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
      } 
      
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
