import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    followedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Follow = mongoose.model("Follow", followSchema);
export default Follow;
