import { Request, Response } from "express";
import pool from "../db/db.config";
import asyncHandler from "../middlewares/asyncHandler";
import { ApartmentRequest, SingleApartmentRequest } from "../utils/types/hometypes"

// Get all apartments with optional filtering
export const getApartments = asyncHandler(async (req: ApartmentRequest, res: Response) => {
  try {
    const { city, state, wifi, laundry, sort } = req.query;
    let query = "SELECT * FROM public.apartments";
    const queryParams: any[] = [];
    let conditions = [];

    // Build WHERE clause with filters
    if (city && typeof city === "string") {
      queryParams.push(city.toLowerCase());
      conditions.push(`LOWER(city) = LOWER($${queryParams.length})`);
    }

    if (state && typeof state === "string") {
      queryParams.push(state.toLowerCase());
      conditions.push(`LOWER(state) = LOWER($${queryParams.length})`);
    }

    if (wifi === "true") {
      conditions.push("wifi = TRUE");
    }

    if (laundry === "true") {
      conditions.push("laundry = TRUE");
    }

    // Add WHERE clause if any conditions exist
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Add sorting
    if (sort && typeof sort === "string") {
      switch (sort) {
        case "name":
          query += " ORDER BY name ASC";
          break;
        case "city":
          query += " ORDER BY city ASC";
          break;
        case "availableUnits":
          query += " ORDER BY availableUnits DESC";
          break;
        default:
          query += " ORDER BY id ASC";
      }
    } else {
      query += " ORDER BY id ASC";
    }

    console.log("Executing query:", query, queryParams);
    const result = await pool.query(query, queryParams);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting apartments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single apartment by ID
export const getApartmentById = asyncHandler(async (req: SingleApartmentRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM public.apartments WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting apartment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new apartment
export const createApartment = asyncHandler(async (req: ApartmentRequest, res: Response) => {
  try {
    const { id, name, city, state, photo, availableUnits, wifi, laundry } = req.body;

    // Check if the apartment with this id already exists
    const apartmentCheck = await pool.query("SELECT id FROM apartments WHERE id = $1", [id]);

    if (apartmentCheck.rows.length > 0) {
      res.status(400).json({ message: "Apartment already exists" });
      return;
    }

    // Insert the apartment
    const apartmentResult = await pool.query(
      "INSERT INTO apartments(id, name, city, state, photo, availableUnits, wifi, laundry) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, name, city, state, photo, availableUnits, wifi, laundry]
    );

    res.status(201).json({ message: "Apartment successfully created", apartment: apartmentResult.rows[0] });
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an existing apartment
export const updateApartment = asyncHandler(async (req: ApartmentRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, city, state, photo, availableUnits, wifi, laundry } = req.body;

    const checkApartment = await pool.query("SELECT * FROM public.apartments WHERE id = $1", [id]);
    if (checkApartment.rows.length === 0) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    const result = await pool.query(
      "UPDATE apartments SET name = $1, city = $2, state = $3, photo = $4, availableUnits = $5, wifi = $6, laundry = $7, updated_at = NOW() WHERE id = $8 RETURNING *",
      [name, city, state, photo, availableUnits, wifi, laundry, id]
    );

    res.json({ message: "Apartment updated", apartment: result.rows[0] });
  } catch (error) {
    console.error("Error updating apartment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an apartment
export const deleteApartment = asyncHandler(async (req: ApartmentRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM public.apartments WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    res.json({ message: "Apartment deleted successfully" });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
