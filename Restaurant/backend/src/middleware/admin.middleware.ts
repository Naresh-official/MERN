import { NextFunction, Request, Response } from "express";

export default async function verifyAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = req.user;
        if (user?.role !== "admin") {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
            return;
        }
        next();
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
}
