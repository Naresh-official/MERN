import { Hotel } from "../models/hotel.model.js";
import constructSearchQuery from "../utils/searchQuery.js";

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
