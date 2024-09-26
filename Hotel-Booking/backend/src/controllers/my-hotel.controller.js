import { Hotel } from "../models/hotel.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createMyHotel = async (req, res) => {
    try {
        const {
            name,
            city,
            state,
            description,
            type,
            adultCount,
            childCount,
            facilities,
            pricePerNight,
        } = req.body;
        const images = req.files;
        let urls = [];
        await Promise.all(
            images.map(async (file) => {
                const buffer = Buffer.from(file.buffer);
                const url = await uploadToCloudinary(buffer);
                if (!url) throw new Error("Failed to upload image");
                urls.push(url);
            })
        );

        const newHotel = await Hotel.create({
            name,
            city,
            state,
            description,
            type,
            adultCount,
            childCount,
            facilities,
            pricePerNight,
            images: urls,
        });
        return res.status(200).json({
            success: true,
            message: "Images uploaded successfully",
            data: newHotel,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
