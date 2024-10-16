import { Request, Response } from "express";
import Order, { IOrder } from "../models/order.model.js";
import mongoose from "mongoose";

export const placeOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { restaurant, items } = req.body as Pick<
            IOrder,
            "restaurant" | "items"
        >;
        if (!restaurant || !mongoose.Types.ObjectId.isValid(restaurant)) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid restaurant id",
            });
            return;
        }
        let total = 0;
        items.forEach((item) => {
            if (!item.item || !mongoose.Types.ObjectId.isValid(item.item)) {
                res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "Invalid item id",
                });
                return;
            }
            total += item.currentPrice * item.quantity;
        });

        const order = await Order.create({
            user: req.user?._id,
            restaurant,
            items,
            total,
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order placed successfully",
            order,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const cancelOrder = async (
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
        const order: IOrder[] | null = await Order.find({
            _id: id,
            user: req.user?._id,
        });
        if (!order) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Order not found",
            });
            return;
        }
        if (order[0].status === "cancelled") {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Order already cancelled",
            });
            return;
        }
        order[0].status = "cancelled";
        await order[0].save();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order cancelled successfully",
            order,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const getMyOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orders: IOrder[] | null = await Order.find({
            user: req.user?._id,
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const getOrderById = async (
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
        let order: IOrder | null = null;
        if (req.user?.role === "admin") {
            order = await Order.findById(id);
        } else {
            const orderArray: IOrder[] | null = await Order.find({
                _id: id,
                user: req.user?._id,
            });
            order = orderArray[0] || null;
        }
        if (!order) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Order not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order fetched successfully",
            order,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const getOrdersByRestaurant = async (
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
        const orders: IOrder[] | null = await Order.find({
            restaurant: id,
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const updateOrder = async (
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
        const order: IOrder | null = await Order.findById(id);
        if (!order) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Order not found",
            });
            return;
        }
        order.status = req.body.status;
        await order.save();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order updated successfully",
            order,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};
