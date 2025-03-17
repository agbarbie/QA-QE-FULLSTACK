import { setupAliases } from "import-aliases";
setupAliases();

import express from "express"
import {createUserRole,getUserRoleById,getUserRoles,updateUserRole,deleteUserRole} from "@app/controllers/user_roles"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createUserRole)
router.get("/", getUserRoles);
router.get("/:role_id", getUserRoleById);
router.put("/:role_id", updateUserRole);
router.delete("/:role_id", deleteUserRole);
export default router