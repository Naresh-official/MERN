import mongoose from "mongoose";

export default async function dbConnect() {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB : ", db.connection.host);
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB : ", error);
        throw error;
    }
}
