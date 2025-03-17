import { setupAliases } from "import-aliases";
setupAliases();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "@app/db/db.config";
import { UserRequest } from "@app/utils/types/userTypes";
import asyncHandler from "@app/middlewares/asyncHandler";

//Auth middleware to protect routes 
export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token;

    //trying to get token from Authorization Header 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    //get the token from cookies 
    if (!token && req.cookies?.access_token) {
        token = req.cookies.access_token;
    }

    //if no token found
    if (!token) {
        res.status(401).json({ message: "Not authorized , no token" })
    }

    try {
        //we have the token but we nneed to verify it 
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        //verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; roleId: number };

        //get the user from database
        const userQuery = await pool.query(
            "SELECT users.id, users.name, users.email, users.role_id, user_roles.role_name FROM users JOIN user_roles ON users.role_id = user_roles.id WHERE users.id = $1",
            [decoded.userId]
        );

        
        if (userQuery.rows.length === 0) {
            res.status(401).json({ message: "User not found" });
            return;
        }


        //attach the user to the request 
        req.user = userQuery.rows[0]

        next() //proceed to next thing 


    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }

})