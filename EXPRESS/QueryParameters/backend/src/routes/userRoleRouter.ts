import { setupAliases } from "import-aliases";
setupAliases();

import express from "express"
import {createUserRole,getUserRoleById,getUserRoles,updateUserRole,deleteUserRole} from "@app/controllers/user_roles"
import { adminGuard } from "@app/middlewares/roleMiddleWare";
import { protect } from "@app/middlewares/protect";

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createUserRole)
router.get("/", getUserRoles);
router.get("/:role_id", getUserRoleById);
router.put("/:role_id", protect,adminGuard,updateUserRole);
router.delete("/:role_id", deleteUserRole);
export default router