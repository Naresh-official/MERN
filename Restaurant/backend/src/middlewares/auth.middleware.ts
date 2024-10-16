import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model.js";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized - No token provided",
            });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };
        const user: IUser | null = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized - User not found",
            });
        }

        req.user = user;
        next();
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

export default verifyToken;
