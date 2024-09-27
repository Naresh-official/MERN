import mongoose from "mongoose";
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
            childrenCount,
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
            owner: req.user._id,
            name,
            city,
            state,
            description,
            type,
            adultCount,
            childrenCount,
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

export const getAllMyHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({
            owner: req.user._id,
        });
        return res.status(200).json({
            success: true,
            message: "Hotels fetched successfully",
            data: hotels,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const getMyHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel id",
            });
        }
        const hotel = await Hotel.find({
            _id: id,
            owner: req.user._id,
        });
        return res.status(200).json({
            success: true,
            message: "Hotel fetched successfully",
            data: hotel,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const updateMyHotel = async (req, res) => {
    try {
        const {
            name,
            city,
            state,
            description,
            type,
            adultCount,
            childrenCount,
            facilities,
            pricePerNight,
        } = req.body;

        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel id",
            });
        }
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(400).json({
                success: false,
                message: "Hotel not found",
            });
        }
        if (hotel.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to update this hotel",
            });
        }

        hotel.name = name || hotel.name;
        hotel.city = city || hotel.city;
        hotel.state = state || hotel.state;
        hotel.description = description || hotel.description;
        hotel.type = type || hotel.type;
        hotel.adultCount = adultCount || hotel.adultCount;
        hotel.childrenCount = childrenCount || hotel.childrenCount;
        hotel.facilities = facilities || hotel.facilities;
        hotel.pricePerNight = pricePerNight || hotel.pricePerNight;
        await hotel.save();

        return res.status(200).json({
            success: true,
            message: "Hotel updated successfully",
            data: hotel,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const deleteMyHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel id",
            });
        }
        const hotel = await Hotel.findOneAndDelete({
            _id: id,
            owner: req.user._id,
        });
        if (!hotel) {
            return res.status(400).json({
                success: false,
                message: "Hotel not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Hotel deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
