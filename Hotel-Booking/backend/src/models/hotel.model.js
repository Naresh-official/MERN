import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },
        name: {
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
        description: {
            type: String,
        },
        type: {
            type: String,
            enum:["budget","luxury","resort"],
        },
        adultCount: {
            type: Number,
        },
        childrenCount: {
            type: Number,
        },
        facilities: {
            type: [String],
        },
        images: {
            type: [String],
        },
        pricePerNight: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

export const Hotel = mongoose.model("Hotel", hotelSchema);
