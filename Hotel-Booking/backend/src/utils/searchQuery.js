export default function constructSearchQuery(query) {
    let queryObject = {};
    if (query.destination) {
        queryObject.$or = [
            { city: { $regex: query.destination, $options: "i" } },
            { state: { $regex: query.destination, $options: "i" } },
        ];
    }
    if (query.adultCount) {
        queryObject.adultCount = { $gte: parseInt(query.adultCount) };
    }
    if (query.childrenCount) {
        queryObject.childrenCount = { $gte: parseInt(query.childrenCount) };
    }
    if (query.facilities) {
        queryObject.facilities = {
            $all: Array.isArray(query.facilities)
                ? query.facilities
                : [query.facilities],
        };
    }
    if (query.type) {
        queryObject.type = {
            $in: Array.isArray(query.type) ? query.type : [query.type],
        };
    }
    if (query.maxPrice) {
        queryObject.pricePerNight = {
            $lte: parseInt(query.maxPrice),
        };
    }
    if (query.stars) {
        queryObject.stars = {
            $gte: parseInt(query.stars),
        };
    }
    return queryObject;
}
