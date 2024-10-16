import { Router } from "express";

import {
    placeOrder,
    cancelOrder,
    getMyOrders,
    getOrderById,
    updateOrder,
    getOrdersByRestaurant,
} from "../controllers/order.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = Router();

router.post("/place", verifyJWT, placeOrder);
router.post("/cancel", verifyJWT, cancelOrder);
router.get("/my", verifyJWT, getMyOrders);
router.get("/:id", verifyJWT, getOrderById);
router.patch("/:id", verifyJWT, verifyAdmin, updateOrder);
router.get("/restaurant/:id", verifyJWT, verifyAdmin, getOrdersByRestaurant);

export default router;
