import { Request, Response } from "express";
import Restaurant, { IRestaurant } from "../models/restaurant.model.js";

export const registerRestaurant = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, address, city, state, contact } = req.body as Pick<
            IRestaurant,
            "name" | "address" | "city" | "state" | "contact"
        >;
        const newRestaurant = new Restaurant({
            name,
            address,
            city,
            state,
            contact,
            owner: req.user?._id,
        });
        // TODO: add images
        await newRestaurant.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Restaurant created successfully",
            data: newRestaurant,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};
