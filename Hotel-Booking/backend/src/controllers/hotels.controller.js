import { Hotel } from "../models/hotel.model.js";
import constructSearchQuery from "../utils/searchQuery.js";

export const searchHotels = async (req, res) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        const query = constructSearchQuery(req.query);
        const hotels = await Hotel.find(query).skip(skip).limit(pageSize);
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
