import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
    name: string;
    description?: string;
    price: number;
    image: string;
    restaurant: mongoose.Types.ObjectId;
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
});

const MenuItem = mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItem;
