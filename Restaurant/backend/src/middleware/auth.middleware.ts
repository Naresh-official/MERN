import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: IUser | null;
        }
    }
}

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized - No token",
            });
            return;
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };
        const user: IUser | null = await User.findById(id);
        if (!user) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized - Invalid token",
            });
            return;
        }
        req.user = user;
        next();
    } catch (error: any) {
        res.status(401).json({
            success: false,
            statusCode: 401,
            message: error.message,
        });
    }
}

export default verifyJWT;
