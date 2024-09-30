import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/create/:postId", createComment);

export default router