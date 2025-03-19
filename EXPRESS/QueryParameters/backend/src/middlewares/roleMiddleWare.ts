import { Request, Response, NextFunction } from "express";
import { RoleRequest } from "../utils/types/user_RoleTypes";
import asyncHandler from "./asyncHandler";


//ensure user has required roles 
export const roleGuard = (allowedRoles: string[]) =>
    asyncHandler(async (req: RoleRequest, res: Response, next: NextFunction) => {
        if (!req.user || !allowedRoles.includes(req.user.role_name)) {
            res.status(403).json({ message: "Access denied: Insufficient permissions" });
            return;
        }
        next();
    });



// Specific guards
export const adminGuard = roleGuard(["Admin"]);        
export const librarianGuard = roleGuard(["Librarian"]); 
export const borrowerGuard = roleGuard(["Borrower"]);   

export const admin1Guard = roleGuard(["Admin","Librarian"]);   