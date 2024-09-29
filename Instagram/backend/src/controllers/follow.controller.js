import mongoose from "mongoose";
import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";

export const followOrUnfollowUser = async (req, res) => {
    try {
        const { followToId } = req.params;
        const user = req.user;
        if (!mongoose.Types.ObjectId.isValid(followToId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        if (user._id.toString() === followToId) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Cannot follow yourself",
            });
        }

        const followTo = await User.findById(followToId);
        if (!user || !followTo) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }

        const follow = await Follow.findOne({
            $and: [{ followedBy: user._id }, { followedTo: followToId }],
        });
        if (follow) {
            await Follow.findByIdAndDelete(follow._id);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Unfollowed successfully",
            });
        } else {
            const newFollow = await Follow.create({
                followedBy: user._id,
                followedTo: followToId,
            });
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Followed successfully",
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
