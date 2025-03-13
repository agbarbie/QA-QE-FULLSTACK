import express from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUsers } from "../controllers/userController"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createUser)
router.get("/", getUsers);
router.get("/:user_id", getUserById);
router.put("/:user_id", updateUsers);
router.delete("/:user_id", deleteUser);

export default router