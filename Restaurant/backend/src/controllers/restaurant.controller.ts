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
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
            return;
        }
        const restaurants: IRestaurant[] = await Restaurant.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "menuitems",
                    localField: "_id",
                    foreignField: "restaurant",
                    as: "menuItems",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    address: 1,
                    city: 1,
                    state: 1,
                    contact: 1,
                    menuItems: 1,
                },
            },
        ]);
        if (restaurants.length === 0) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Restaurant not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Restaurant fetched successfully",
            data: restaurants[0],
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
    req: Request,
    res: Response
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
