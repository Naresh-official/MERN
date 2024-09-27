import { Router } from "express";
import { getHotelById, searchHotels } from "../controllers/hotels.controller.js";

const router = Router();

router.get("/search", searchHotels);
router.get("/:id", getHotelById);

export default router;
