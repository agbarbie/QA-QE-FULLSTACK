import { Response } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Apartment } from '../types/hometypes'; // Adjust the import path as necessary
 // Import the Apartment interface from wherever you defined it

dotenv.config();

// You can keep these debug lines during development but remove in production
console.log("JWT_SECRET: ", process.env.JWT_SECRET);
console.log("APARTMENT_TOKEN_SECRET: ", process.env.APARTMENT_TOKEN_SECRET);

export const generateApartmentToken = (res: Response, apartmentId: number, cityState: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    const apartmentSecret = process.env.APARTMENT_TOKEN_SECRET;
    
    if (!jwtSecret || !apartmentSecret) {
        throw new Error("JWT_SECRET or APARTMENT_TOKEN_SECRET is not defined in environment variables");
    }
    
    try {
        // Generate a short-lived access token for apartment data
        const accessToken = jwt.sign(
            { apartmentId, cityState },
            jwtSecret,
            { expiresIn: "15m" }
        );
        
        // Generate a long-lived apartment refresh token
        const apartmentToken = jwt.sign(
            { apartmentId },
            apartmentSecret,
            { expiresIn: "7d" }  // 7 days for apartment listings
        );
        
        // Set Access token as HTTP-Only secure cookie
        res.cookie("apt_access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Secure in production
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        
        // Set Apartment Token as HTTP-Only Secure Cookie
        res.cookie("apt_token", apartmentToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        return { accessToken, apartmentToken };
    } catch (error) {
        console.error("Error generating apartment JWT:", error);
        throw new Error("Error generating apartment authentication tokens");
    }
};