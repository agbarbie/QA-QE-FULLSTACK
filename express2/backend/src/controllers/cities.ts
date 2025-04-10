import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../db/db.config";

// Get all cities
export const getCities = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM public.cities ORDER BY name");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting cities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single city by ID
export const getCityById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { city_id } = req.params;
    const result = await pool.query("SELECT * FROM public.cities WHERE id = $1", [city_id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new city
export const createCity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, state, country } = req.body;
    
    const cityResult = await pool.query(
      "INSERT INTO cities(name, state, country, created_at) VALUES($1, $2, $3, $4) RETURNING *", 
      [name, state, country, new Date()]
    );
    
    res.status(201).json({
      message: "City successfully created",
      city: cityResult.rows[0]
    });
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an existing city
export const updateCity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { city_id } = req.params;
    const { name, state, country } = req.body;
    
    const checkCity = await pool.query("SELECT * FROM public.cities WHERE id = $1", [city_id]);
    if (checkCity.rows.length === 0) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    
    const result = await pool.query(
      "UPDATE cities SET name = $1, state = $2, country = $3, updated_at = $4 WHERE id = $5 RETURNING *",
      [name, state, country, new Date(), city_id]
    );
    
    res.json({ message: "City updated", city: result.rows[0] });
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a city
export const deleteCity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { city_id } = req.params;
    const result = await pool.query("DELETE FROM public.cities WHERE id = $1 RETURNING *", [city_id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    
    res.json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
