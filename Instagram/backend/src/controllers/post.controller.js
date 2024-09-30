import sharp from "sharp";
import Post from "../models/post.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const user = req.user;
        const image = req?.file;
        if (!caption)
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide caption",
            });
        if (!image)
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide image",
            });
        const newPost = new Post({
            caption,
            owner: user._id,
        });
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 600, height: 600, fit: "cover" })
            .toBuffer();
        const url = await uploadToCloudinary(optimizedImageBuffer);
        newPost.image = url;
        await newPost.save();
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Post created successfully",
            data: { post: newPost },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "comments",
                },
            },
            {
                $addFields: {
                    likes: { $ifNull: ["$likes", []] },
                    comments: { $ifNull: ["$comments", []] },
                    likesCount: { $size: { $ifNull: ["$likes", []] } },
                    commentsCount: { $size: { $ifNull: ["$comments", []] } },
                    isLiked: {
                        $in: [
                            new mongoose.Types.ObjectId(req.user._id),
                            { $ifNull: ["$likes.user", []] },
                        ],
                    },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    caption: 1,
                    image: 1,
                    likesCount: 1,
                    commentsCount: 1,
                    isLiked: 1,
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Posts fetched successfully",
            data: { posts },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(req.user._id),
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "comments",
                },
            },
            {
                $addFields: {
                    likes: { $ifNull: ["$likes", []] },
                    comments: { $ifNull: ["$comments", []] },
                    likesCount: { $size: { $ifNull: ["$likes", []] } },
                    commentsCount: { $size: { $ifNull: ["$comments", []] } },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    caption: 1,
                    image: 1,
                    likesCount: 1,
                    commentsCount: 1,
                },
            },
        ]);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Posts fetched successfully",
            data: { posts },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const user = req.user;
        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Post not found",
            });
        }
        if (post.owner.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: "You are not authorized to delete this post",
            });
        }
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Post deleted successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
}