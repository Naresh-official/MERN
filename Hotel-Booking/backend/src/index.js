import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";

dotenv.config({
    path: "./.env",
});

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

dbConnect()
    .then(() => {
        app.listen(3000, () => {
            console.log("Example app listening on port 3000!");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB : ", error);
    });
