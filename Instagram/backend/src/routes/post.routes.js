import { Router } from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getMyPosts,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post("/create", upload.single("image"), createPost);
router.get("/getall", getAllPosts);
router.get("/getmyposts", getMyPosts);
router.delete("/delete/:postId", deletePost);

export default router;
