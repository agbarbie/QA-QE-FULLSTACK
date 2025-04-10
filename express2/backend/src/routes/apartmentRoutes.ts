import { setupAliases } from "import-aliases";
setupAliases();

import express from "express";
import { createApartment, getApartments, getApartmentById, updateApartment, deleteApartment } from "@app/controllers/apartments";
import { protect } from "@app/middlewares/protect";
import {  adminGuard } from "@app/middlewares/roleMiddleWare";

// Instance of router
const router = express.Router();

// Create the routes
router.post("/", createApartment);
router.get("/", getApartments);
router.get("/:id", getApartmentById);
router.put("/:id", updateApartment);
router.delete("/:id", deleteApartment);

// Public routes
router.post("/", protect, createApartment);

// Protected Routes - Only managers can manage their own apartments
router.post("/", protect, createApartment);

// Admin Routes - Admins can manage all apartments
router.delete("/:id/admin", protect, adminGuard, deleteApartment);
router.post("/", protect, adminGuard, createApartment);

// Both admin and manager can update apartments
router.put("/:id", protect, updateApartment);

export default router;
