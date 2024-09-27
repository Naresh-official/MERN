import { Router } from "express";
import {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.get("/logout", verifyToken, logoutUser);

export default router;
