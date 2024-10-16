import { Router } from "express";
import {
    login,
    logout,
    signup,
    verifyEmail,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/verify", verifyEmail);

export default router;
