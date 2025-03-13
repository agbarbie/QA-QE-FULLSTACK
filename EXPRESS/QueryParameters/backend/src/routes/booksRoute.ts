import express from "express"
import{createBooks,getBooks,getBooksById,updateBooks,deleteBooks} from "../controllers/booksContollers"

//instance of router
const router = express.Router()

//create the routes
router.post("/", createBooks)
router.get("/", getBooks);
router.get("/:id", getBooksById);
router.put("/:id", updateBooks);
router.delete("/:id", deleteBooks);

export default router