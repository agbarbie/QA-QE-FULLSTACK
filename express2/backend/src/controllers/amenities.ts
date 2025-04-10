import { setupAliases } from "import-aliases";
setupAliases();
import { Request, Response } from "express";
import asyncHandler from "@app/middlewares/asyncHandler";
import pool from "@app/db/db.config";

// Get all amenities
export const getAmenities = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM public.amenities");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting amenities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single amenity by ID
export const getAmenityById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { amenity_id } = req.params;
    const result = await pool.query("SELECT * FROM public.amenities WHERE amenity_id = $1", [amenity_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Amenity not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting amenity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new amenity
export const createAmenity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { amenity_id, name, description, available } = req.body;

    // Check if the amenity already exists
    const amenityCheck = await pool.query("SELECT amenity_id FROM amenities WHERE amenity_id = $1", [amenity_id]);
    if (amenityCheck.rows.length > 0) {
      res.status(400).json({ message: "Amenity already exists" });
      return;
    }

    // Insert the amenity
    const amenityResult = await pool.query(
      "INSERT INTO amenities(amenity_id, name, description, available) VALUES($1, $2, $3, $4) RETURNING *",
      [amenity_id, name, description, available]
    );

    res.status(201).json({
      message: "Amenity successfully created",
      amenity: amenityResult.rows[0]
    });
  } catch (error) {
    console.error("Error creating amenity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an existing amenity
export const updateAmenity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { amenity_id } = req.params;
    const { name, description, available } = req.body;

    const checkAmenity = await pool.query("SELECT * FROM public.amenities WHERE amenity_id = $1", [amenity_id]);
    if (checkAmenity.rows.length === 0) {
      res.status(404).json({ message: "Amenity not found" });
      return;
    }

    const result = await pool.query(
      "UPDATE amenities SET name = $2, description = $3, available = $4 WHERE amenity_id = $1 RETURNING *",
      [amenity_id, name, description, available]
    );

    res.json({ message: "Amenity updated", amenity: result.rows[0] });
  } catch (error) {
    console.error("Error updating amenity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an amenity
export const deleteAmenity = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { amenity_id } = req.params;
    const result = await pool.query("DELETE FROM public.amenities WHERE amenity_id = $1 RETURNING *", [amenity_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Amenity not found" });
      return;
    }

    res.json({ message: "Amenity deleted successfully" });
  } catch (error) {
    console.error("Error deleting amenity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
