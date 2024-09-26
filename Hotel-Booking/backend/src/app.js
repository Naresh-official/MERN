import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export default app;