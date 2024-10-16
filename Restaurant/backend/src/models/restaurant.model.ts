import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
    owner: mongoose.Types.ObjectId;
    name: string;
    address: string;
    city: string;
    state: string;
    contact: Number;
    menuItems: mongoose.Types.ObjectId[];
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const RestaurantSchema = new Schema<IRestaurant>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        menuItems: [
            {
                type: Schema.Types.ObjectId,
                ref: "MenuItem",
            },
        ],
        images: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
