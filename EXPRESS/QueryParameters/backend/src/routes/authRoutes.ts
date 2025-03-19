import { setupAliases } from "import-aliases";
setupAliases();

import express from 'express'
import { loginUser, logoutUser, registerUser,deleteUser } from '@app/controllers/authControllers'
import { protect } from "@app/middlewares/protect";
import { adminGuard } from "@app/middlewares/roleMiddleWare";

const router = express.Router()

//public routes 
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/delete/:user_id", protect,adminGuard,deleteUser);
router.post("/update/:user_id", protect,adminGuard,deleteUser);

export default router