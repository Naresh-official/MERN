import { Router } from "express";
import { followOrUnfollowUser } from "../controllers/follow.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:followToId", verifyToken, followOrUnfollowUser);

export default router;
