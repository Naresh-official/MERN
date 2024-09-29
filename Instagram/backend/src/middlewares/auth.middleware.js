import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
        }
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if (!user)
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export default verifyToken;
