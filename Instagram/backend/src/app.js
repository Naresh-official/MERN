import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.routes.js";
import followRoutes from "./routes/follow.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/follow", followRoutes);

export default app;
