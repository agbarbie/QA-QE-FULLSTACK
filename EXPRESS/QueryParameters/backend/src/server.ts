import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { readFileSync } from "fs";
import path from 'path';
import cors from "cors";

dotenv.config();

const app = express();

// Load the variables
const port = process.env.PORT || 3000;
const secret = process.env.SECRET;
console.log("Server port:", port);

app.use(cors());

// Get the current directory 
const _dirname = path.resolve();

// Synchronously read the file
const booksData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
);
const books = JSON.parse(booksData).books;
console.log("Loaded books:", books.length);

// Middleware to log requests for debugging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Query parameters:", req.query);
  next();
});

// Now, let's create a GET API route that filters events based on query parameters
app.get('/api/books', (req: Request, res: Response) => {
  try {
    console.log("Received filter request with query:", req.query);
    const { genre, year, pages, sort } = req.query;
    let filteredBooks = [...books]; // Start with full data
    
    // Filtering logic
    if (genre && typeof genre === 'string') {
      console.log(`Filtering by genre: ${genre}`);
      filteredBooks = filteredBooks.filter((book) =>
        book.genre.toLowerCase() === genre.toLowerCase()
      );
      console.log(`After genre filter: ${filteredBooks.length} books`);
    }
    
    if (pages && typeof pages === 'string') {
      const minPages = parseInt(pages);
      console.log(`Filtering by min pages: ${minPages}`);
      
      if (!isNaN(minPages)) {
        filteredBooks = filteredBooks.filter((book) => book.pages >= minPages);
        console.log(`After pages filter: ${filteredBooks.length} books`);
      }
    }
    
    if (year && typeof year === 'string') {
      const publishYear = parseInt(year);
      console.log(`Filtering by year: ${publishYear}`);
      
      if (!isNaN(publishYear)) {
        filteredBooks = filteredBooks.filter((book) => book.year >= publishYear);
        console.log(`After year filter: ${filteredBooks.length} books`);
      }
    }
    
    // Sorting logic
    if (sort && typeof sort === 'string') {
      console.log(`Sorting by: ${sort}`);
      
      switch(sort) {
        case 'title':
          filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
          break;
        case 'year':
          filteredBooks.sort((a, b) => a.year - b.year);
          break;
        case 'pages':
          filteredBooks.sort((a, b) => a.pages - b.pages);
          break;
      }
    }
    
    console.log(`Returning ${filteredBooks.length} books`);
    res.json(filteredBooks);
  } catch (error) {
    console.error("Error filtering books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Basic route to return all books
app.get('/', (req, res) => {
  res.json(books);
});

// Create server 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});