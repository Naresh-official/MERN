import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./utils/dbConnect.js";

dotenv.config();
dbConnect()
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
