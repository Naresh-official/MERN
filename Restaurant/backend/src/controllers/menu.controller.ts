import { Request, Response } from "express";
import MenuItem, { IMenuItem } from "../models/menuItem.model.js";
import mongoose from "mongoose";

export const addMenuItem = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { restaurant, name, price, description, image } =
            req.body as Pick<
                IMenuItem,
                | "name"
                | "restaurant"
                | "price"
                | "description"
                | "image"
                | "restaurant"
            >;
        if (!restaurant || !mongoose.Types.ObjectId.isValid(restaurant)) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid restaurant id",
            });
            return;
        }
        const newMenuItem: IMenuItem | null = new MenuItem({
            name,
            restaurant,
            price,
            description,
            image,
        });
        // TODO: add image
        await newMenuItem.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "MenuItem created successfully",
            data: newMenuItem,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const getMenuItems = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const pagesize: number = 10;
        let page: number = parseInt(req.query.page as string) || 1;
        if (page < 1) {
            page = 1;
        }
        const menuItems: IMenuItem[] | null = await MenuItem.find()
            .skip((page - 1) * pagesize)
            .limit(pagesize);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "MenuItems fetched successfully",
            data: menuItems,
            pagination: {
                currentPage: page,
                totalPage: Math.ceil(
                    (await MenuItem.countDocuments()) / pagesize
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

export const deleteMenuItem = async (
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
        await MenuItem.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "MenuItem deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const getMenuItemById = async (
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
        const menuItems: IMenuItem[] | null = await MenuItem.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurant",
                    foreignField: "_id",
                    as: "restaurant",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    description: 1,
                    image: 1,
                    restaurant: {
                        _id: 1,
                        name: 1,
                    },
                },
            },
        ]);
        if (menuItems?.length === 0) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "MenuItem not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "MenuItem fetched successfully",
            data: menuItems[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};
