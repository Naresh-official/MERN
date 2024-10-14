import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
    items: IOrderItem[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IOrderItem {
    item: mongoose.Types.ObjectId;
    currentPrice: number;
    quantity: number;
}

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        items: [
            {
                item: {
                    type: mongoose.Types.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                currentPrice: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "delivered", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
