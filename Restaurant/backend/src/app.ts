import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export default app;
