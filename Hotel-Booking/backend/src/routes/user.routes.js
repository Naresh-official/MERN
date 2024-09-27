import { Router } from "express";
import {
    getMyBookings,
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
router.get("/bookings", verifyToken, getMyBookings);

export default router;
