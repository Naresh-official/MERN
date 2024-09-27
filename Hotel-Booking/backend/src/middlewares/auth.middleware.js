import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).send({
                statusCode: 401,
                message: "Token not found",
                success: false,
            });
        }
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.status(401).send({
                statusCode: 401,
                message: "Unauthorized Request",
                success: false,
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                message: "Invalid Access Token",
                success: false,
            });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send({
            statusCode: 401,
            message: error?.message || "Invalid Access Token",
            success: false,
        });
    }
}
