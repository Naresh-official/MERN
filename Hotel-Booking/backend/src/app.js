import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import myHotelRouter from "./routes/my-hotel.routes.js";
import hotelRouter from "./routes/hotels.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/my-hotel", myHotelRouter);
app.use("/api/v1/hotels", hotelRouter);

export default app;
