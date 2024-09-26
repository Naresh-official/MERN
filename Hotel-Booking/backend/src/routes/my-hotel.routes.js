import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createMyHotel } from "../controllers/my-hotel.controller.js";

const router = Router();

router.post("/create", upload.array("images", 2), createMyHotel);

export default router;
