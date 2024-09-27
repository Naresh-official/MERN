import { Router } from "express";
import { searchHotels } from "../controllers/hotels.controller.js";

const router = Router();

router.get("/search", searchHotels);

export default router;
