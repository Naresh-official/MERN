import { Router } from "express";
import {
    bookHotel,
    getHotelById,
    searchHotels,
} from "../controllers/hotels.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/search", searchHotels);
router.get("/:id", getHotelById);
router.post("/booking/:hotelId", verifyToken, bookHotel);

export default router;
