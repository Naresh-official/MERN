import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./utils/dbConnect.js";

dbConnect()
    .then(() => {
        const port = process.env.PORT || 8000;
        app.on("error", (error) => {
            throw error;
        });
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
