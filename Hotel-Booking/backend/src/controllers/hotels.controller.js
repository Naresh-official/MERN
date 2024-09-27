import mongoose from "mongoose";
import { Hotel } from "../models/hotel.model.js";
import constructSearchQuery from "../utils/searchQuery.js";
import { Booking } from "../models/booking.model.js";

export const searchHotels = async (req, res) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        const query = constructSearchQuery(req.query);

        // sorting logic based on query
        let sortObject = {};
        if (req.query.sort) {
            switch (req.query.sort) {
                case "rating": {
                    sortObject = { rating: -1 };
                    break;
                }
                case "pricePerNightAsc": {
                    sortObject = { pricePerNight: 1 };
                    break;
                }
                case "pricePerNightDesc": {
                    sortObject = { pricePerNight: -1 };
                    break;
                }
                default: {
                    break;
                }
            }
        }

        const hotels = await Hotel.find(query)
            .sort(sortObject)
            .skip(skip)
            .limit(pageSize);
        const total = await Hotel.find(query).countDocuments();
        return res.status(200).json({
            success: true,
            message: "Hotels fetched successfully",
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel id",
            });
        }
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(400).json({
                success: false,
                message: "Hotel not found",
            });
        }
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

export const bookHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { checkIn, checkOut, adultCount, childrenCount } = req.body;
        if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel id",
            });
        }
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(400).json({
                success: false,
                message: "Hotel not found",
            });
        }
        const noOfNights = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        );
        const totalPrice = noOfNights * hotel.pricePerNight;
        const booking = await Booking.create({
            hotel: hotelId,
            user: req.user._id,
            checkIn,
            checkOut,
            adultCount,
            childrenCount,
            totalPrice,
        });
        hotel.bookings.push(booking._id);
        await hotel.save();

        return res.status(200).json({
            success: true,
            message: "Hotel booked successfully",
            data: { ...booking._doc, noOfNights },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
