import { User } from "../models/user.model";

export default function verifyToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!userId) {
            return res.status(401).send({
                statusCode: 401,
                data: "Unauthorized Request",
                success: false,
            });
        }
        const user = User.findById(userId);
        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                data: "Invalid Access Token",
                success: false,
            });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send({
            statusCode: 401,
            data: error?.message || "Invalid Access Token",
            success: false,
        });
    }
}
