import dotenv from "dotenv";
import connectDB from "./utils/dbConnect.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Error connecting to MongoDB : ", error);
            throw error;
        });
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB : ", error);
        process.exit(1);
    });
