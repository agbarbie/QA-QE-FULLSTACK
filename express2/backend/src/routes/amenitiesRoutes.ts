import { setupAliases } from "import-aliases";
setupAliases();

import express from "express";
import { createAmenity, deleteAmenity, getAmenityById, getAmenities, updateAmenity } from "@app/controllers/amenities";

// Instance of router 
const router = express.Router();

// Create the routes
router.post("/", createAmenity);
router.get("/", getAmenities);
router.get("/:amenity_id", getAmenityById);
router.put("/:amenity_id", updateAmenity);
router.delete("/:amenity_id", deleteAmenity);

export default router;
