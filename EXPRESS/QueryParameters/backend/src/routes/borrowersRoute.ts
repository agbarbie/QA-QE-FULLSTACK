import { setupAliases } from "import-aliases";
setupAliases();

import express from "express"
import { createBorrower, deleteBorrower, getBorrowerById, getBorrower, updateBorrower } from "@app/controllers/borrowers"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createBorrower)
router.get("/", getBorrower);
router.get("/:borrower_id", getBorrowerById);
router.put("/:borrower_id", updateBorrower);
router.delete("/:borrower_id", deleteBorrower);

export default router