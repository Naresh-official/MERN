import { Router } from "express";
import {
    checkUserwithEmail,
    deleteAccount,
    login,
    logout,
    signup,
    verifyEmail,
} from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/verify", verifyEmail);
router.delete("/delete", verifyJWT, deleteAccount);
router.get("/check/:email", checkUserwithEmail);

export default router;
