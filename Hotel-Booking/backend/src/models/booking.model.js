import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    adultCount: {
        type: Number,
        required: true,
    },
    childrenCount: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

export const Booking = mongoose.model("Booking", bookingSchema);
