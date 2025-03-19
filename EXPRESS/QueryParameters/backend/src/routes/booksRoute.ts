import { setupAliases } from "import-aliases";
setupAliases();

import express from "express"
import{createBooks,getBooks,getBooksById,updateBooks,deleteBooks} from "@app/controllers/booksContollers"
import { protect } from "@app/middlewares/protect"
import { adminGuard, librarianGuard } from '@app/middlewares/roleMiddleWare'

//instance of router
const router = express.Router()

//create the routes
router.post("/", createBooks)
router.get("/", getBooks);
router.get("/:id", getBooksById);
router.put("/:id", updateBooks);
router.delete("/:id", deleteBooks);

//public routes
router.post("/", protect, librarianGuard, createBooks)

// Protected Routes - Only librarian can manage their own books
router.post("/", protect, librarianGuard, createBooks);
router.put("/:id", protect, librarianGuard, updateBooks);

// Admin Routes - Admins can manage all events
router.delete("/:id/admin", protect, adminGuard, deleteBooks);
router.post("/", protect, adminGuard, createBooks);
router.put("/:id", protect, adminGuard, updateBooks);

export default router