import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
    createMyHotel,
    deleteMyHotel,
    getAllMyHotels,
    getMyHotelById,
    updateMyHotel,
} from "../controllers/my-hotel.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", upload.array("images", 2), verifyToken, createMyHotel);
router.get("/all", verifyToken, getAllMyHotels);
router.get("/:id", verifyToken, getMyHotelById);
router.patch("/update/:id", verifyToken, updateMyHotel);
router.delete("/delete/:id", verifyToken, deleteMyHotel);

export default router;
