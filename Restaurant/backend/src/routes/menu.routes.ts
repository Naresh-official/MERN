import { Router } from "express";
import {
    addMenuItem,
    deleteMenuItem,
    getMenuItemById,
    getMenuItems,
} from "../controllers/menu.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = Router();

router.post("/add", verifyJWT, verifyAdmin, addMenuItem);
router.delete("/:id", verifyJWT, verifyAdmin, deleteMenuItem);
router.get("/all", getMenuItems);
router.get("/:id", getMenuItemById);

export default router;
