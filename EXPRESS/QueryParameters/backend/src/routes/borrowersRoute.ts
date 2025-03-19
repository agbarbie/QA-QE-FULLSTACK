import { setupAliases } from "import-aliases";
setupAliases();

import express from "express";
import { 
  createBorrower, 
  deleteBorrower, 
  getBorrowerById, 
  getBorrower, 
  updateBorrower,
  borrowBook,
  renewBook
} from "@app/controllers/borrowers";

// instance of router
const router = express.Router();

// create the routes
router.post("/", createBorrower);
router.get("/", getBorrower);
router.get("/:borrower_id", getBorrowerById);
router.put("/:borrower_id", updateBorrower);
router.delete("/:borrower_id", deleteBorrower);

// Add new routes for borrowing and renewing books
router.post("/borrow", borrowBook);
router.put("/renew/:borrower_id", renewBook);

export default router;