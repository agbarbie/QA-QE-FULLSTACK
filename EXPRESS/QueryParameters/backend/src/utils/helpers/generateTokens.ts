import { Response } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// You can keep these debug lines during development but remove in production
console.log("JWT_SECRET: ", process.env.JWT_SECRET);
console.log("REFRESH_TOKEN_SECRET: ", process.env.REFRESH_TOKEN_SECRET);

export const generateToken = (res: Response, user_id: number, role_id: number) => {
    const jwtSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    
    if (!jwtSecret || !refreshSecret) {
        throw new Error("JWT_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables");
    }
    
    try {
        // Generate a short-lived access token for 15 minutes
        const accessToken = jwt.sign(
            { user_id, role_id }, 
            jwtSecret, 
            { expiresIn: "15m" }
        );
        
        // Generate a long-lived refresh token for 30 days
        const refreshToken = jwt.sign(
            { user_id }, 
            refreshSecret, 
            { expiresIn: "30d" }
        );
        
        // Set Access token as HTTP-Only secure cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Secure in production
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        
        // Set Refresh Token as HTTP-Only Secure Cookie
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw new Error("Error generating authentication tokens");
    }
};