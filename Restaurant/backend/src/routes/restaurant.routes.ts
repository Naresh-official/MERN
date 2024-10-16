import { Router } from "express";
import {
    getRestaurants,
    deleteRestaurant,
    getRestaurantById,
    registerRestaurant,
} from "../controllers/restaurant.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = Router();

router.post("/register", verifyJWT, verifyAdmin, registerRestaurant);
router.delete("/:id", verifyJWT, verifyAdmin, deleteRestaurant);
router.get("/all", getRestaurants);
router.get("/:id", getRestaurantById);

export default router;
