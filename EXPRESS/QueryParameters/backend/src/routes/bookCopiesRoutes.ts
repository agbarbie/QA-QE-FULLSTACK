import { setupAliases } from "import-aliases";
setupAliases();

import express from "express"
import { createBookCopy, deleteBookCopy, getBookCopyById, getBookCopies, updateBookCopy } from "@app/controllers/bookCopiesController"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createBookCopy)
router.get("/", getBookCopies);
router.get("/:copy_id", getBookCopyById);
router.put("/:copy_id", updateBookCopy);
router.delete("/:copy_id", deleteBookCopy);

export default router