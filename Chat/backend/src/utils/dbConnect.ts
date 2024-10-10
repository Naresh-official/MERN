import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error("Error while connecting to MongoDB", error.message);
        process.exit(1);
    }
};

export default dbConnect;
