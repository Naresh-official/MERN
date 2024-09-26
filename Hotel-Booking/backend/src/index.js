import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});
dbConnect()
    .then(() => {
        app.on("error", (error) => {
            console.error("Error connecting to MongoDB : ", error);
            throw error;
        });
        app.listen(3000, () => {
            console.log("Example app listening on port 3000!");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB : ", error);
        process.exit(1);
    });
