import { Router } from "express";
import {
    createComment,
    deleteComment,
    getCommentsOfPost,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/create/:postId", createComment);
router.delete("/delete/:commentId", deleteComment);
router.get("/:postId", getCommentsOfPost);

export default router;
