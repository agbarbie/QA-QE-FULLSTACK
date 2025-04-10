import { setupAliases } from "import-aliases";
setupAliases();

import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import path from 'path';
import cors from "cors";
import pool from "@app/db/db.config";

import apartmentRoutes from "@app/routes/apartmentRoutes"
import authRoutes from "@app/routes/authRoutes";
import amenitiesRoutes from "@app/routes/amenitiesRoutes";

dotenv.config();

const app = express();
app.use(express.json()); // Add this to parse JSON request bodies
app.use(cors());

// Load the variables
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET;
console.log("Server port:", port);

// Get the current directory 
const _dirname = path.resolve();
 
// Import current routes
app.use("/api/auth", authRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/amenities", amenitiesRoutes);

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