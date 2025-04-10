import {Request,Response,NextFunction} from "express"
import asyncHandler from "./asyncHandler";
import {ManagerRequest} from "../utils/types/roleTypes"

// Ensure user has required roles
export const roleGuard = (allowedRoles: string[]) => 
    asyncHandler(async (req: ManagerRequest, res: Response, next: NextFunction) => {
        if (!req.managers || !req.managers.some(manager => allowedRoles.includes(manager.name))) {
            res.status(403).json({ message: "Access denied: Insufficient permissions" });
            return;
        }
        next();
    });


// Specific guards
export const adminGuard = roleGuard(["Admin"]);
export const propertyManagerGuard = roleGuard(["manager"]);
export const adminPropertyManagerGuard = roleGuard(["Admin", "manager"]);
