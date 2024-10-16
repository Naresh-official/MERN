import { Router } from "express";
import { registerRestaurant } from "../controllers/restaurant.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = Router();

router.post("/register", verifyJWT, verifyAdmin, registerRestaurant);

export default router;
