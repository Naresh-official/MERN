import { likeOrUnlikePost } from "../controllers/like.controller.js";
import { Router } from "express";

const router = Router();

router.get("/:postId", likeOrUnlikePost);

export default router;
