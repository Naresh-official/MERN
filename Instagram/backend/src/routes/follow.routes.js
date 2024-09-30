import { Router } from "express";
import { followOrUnfollowUser } from "../controllers/follow.controller.js";

const router = Router();

router.get("/:followToId", followOrUnfollowUser);

export default router;
