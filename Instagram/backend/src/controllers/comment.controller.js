import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        const user = req.user;
        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        if (!comment) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide comment",
            });
        }
        const newComment = new Comment({
            comment,
            commentedBy: user._id,
            post: postId,
        });
        await newComment.save();
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Comment created successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const user = req.user;
        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Comment not found",
            });
        }
        if (comment.commentedBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: "You are not authorized to delete this comment",
            });
        }
        await comment.deleteOne();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const getCommentsOfPost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        const comments = await Comment.find({ post: postId });
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Comments fetched successfully",
            data: { comments },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
