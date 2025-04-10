import { setupAliases } from "import-aliases";
setupAliases();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "@app/db/db.config";
import { ApartmentRequest } from "@app/utils/types/hometypes";
import asyncHandler from "@app/middlewares/asyncHandler";

// Middleware to protect routes and ensure only property managers can access them
export const protect = asyncHandler(async (req: ApartmentRequest, res: Response, next: NextFunction) => {
    let token;

    // Try to get token from Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Get the token from cookies
    if (!token && req.cookies?.access_token) {
        token = req.cookies.access_token;
    }

    // If no token found
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided" });
        return;
    }

    try {
        // Ensure JWT secret is available
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { propertyManagerId: string };

        // Get the property manager from database
        const managerQuery = await pool.query(
            "SELECT id, name, email FROM property_managers WHERE id = $1",
            [decoded.propertyManagerId]
        );

        if (managerQuery.rows.length === 0) {
            res.status(401).json({ message: "Property manager not found" });
            return;
        }

        // Attach the property manager data to the request
        req.apartments = managerQuery.rows[0];

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Not authorized, token verification failed" });
    }
});
