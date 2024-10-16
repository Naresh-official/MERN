import { Request, Response } from "express";
import Restaurant, { IRestaurant } from "../models/restaurant.model.js";
import mongoose from "mongoose";

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

export const getRestaurants = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const pagesize: number = 10;
        let page: number = parseInt(req.query.page as string) || 1;
        if (page < 1) {
            page = 1;
        }
        const restaurants: IRestaurant[] | null = await Restaurant.find()
            .skip((page - 1) * pagesize)
            .limit(pagesize);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Restaurants fetched successfully",
            data: restaurants,
            pagination: {
                currentPage: page,
                totalPage: Math.ceil(
                    (await Restaurant.countDocuments()) / pagesize
                ),
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const getRestaurantById = async (
    res: Response,
    req: Request
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id || mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
            return;
        }
        const restaurant: IRestaurant | null = await Restaurant.findById(
            id
        ).populate("menuItems");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Restaurant fetched successfully",
            data: restaurant,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const deleteRestaurant = async (
    res: Response,
    req: Request
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id || mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
            return;
        }
        await Restaurant.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Restaurant deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};
