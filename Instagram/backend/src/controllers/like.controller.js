import mongoose from "mongoose";
import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

export const likeOrUnlikePost = async (req, res) => {
    try {
        if (
            !req.params.postId ||
            !mongoose.Types.ObjectId.isValid(req.params.postId)
        ) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "invalid id",
            });
        }
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Post not found",
            });
        }
        const like = await Like.findOne({
            $and: [{ user: req.user._id }, { post: req.params.postId }],
        });
        if (like) {
            await Like.findByIdAndDelete(like._id);
            return res
                .status(200)
                .json({ success: true, statusCode: 200, message: "unliked" });
        } else {
            const newLike = new Like({
                user: req.user._id,
                post: req.params.postId,
            });
            await newLike.save();
            return res
                .status(200)
                .json({ success: true, statusCode: 200, message: "liked" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
