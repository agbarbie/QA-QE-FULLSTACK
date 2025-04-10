import { setupAliases } from "import-aliases";
setupAliases();

import express from 'express'
import { loginManager, logoutManager, registerManager } from '@app/controllers/authControllers'
import { protect } from "@app/middlewares/protect";
import { adminGuard } from "@app/middlewares/roleMiddleWare";

const router = express.Router()

//public routes 
router.post("/register", registerManager)
router.post("/login", loginManager)
router.post("/logout", logoutManager)
export default router