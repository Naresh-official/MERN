import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
import userRouter from "./routes/user.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import menuRouter from "./routes/menu.routes.js";
import orderRouter from "./routes/order.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", orderRouter);

export default app;
