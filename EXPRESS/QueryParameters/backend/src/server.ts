import { setupAliases } from "import-aliases";
setupAliases();

import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import path from 'path';
import cors from "cors";
import pool from "@app/db/db.config";

import userRoutes from "@app/routes/usersRoute";
import bookRoutes from "@app/routes/booksRoute";
import borrowerRoutes from "@app/routes/borrowersRoute";
import user_roleRoutes from "@app/routes/userRoleRouter";
import authRoutes from "@app/routes/authRoutes";
import bookcopiesRoute from "@app/routes/bookCopiesRoutes"

dotenv.config();

const app = express();
app.use(express.json()); // Add this to parse JSON request bodies
app.use(cors());

// Load the variables
const port = process.env.PORT || 3000;
const secret = process.env.SECRET;
console.log("Server port:", port);

// Get the current directory 
const _dirname = path.resolve();


//import current routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrowers", borrowerRoutes);
app.use("/api/user_role", user_roleRoutes);
app.use("/api/BooksCopies", bookRoutes);

// Middleware to log requests for debugging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Query parameters:", req.query);
  next();
});


// Create server 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});