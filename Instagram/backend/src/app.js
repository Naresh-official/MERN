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
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/like.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import verifyToken from "./middlewares/auth.middleware.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/follow", verifyToken, followRoutes);
app.use("/api/v1/post", verifyToken, postRoutes);
app.use("/api/v1/like", verifyToken, likeRoutes);
app.use("/api/v1/comment", verifyToken, commentRoutes);

export default app;
