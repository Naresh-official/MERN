import { Router } from "express";
import {
    deleteUser,
    editUser,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.get("/logout", verifyToken, logoutUser);
router.get("/me", verifyToken, getUser);
router.post("/edit", verifyToken, upload.single("profileImg"), editUser);
router.get("/delete/", verifyToken, deleteUser);

export default router;
