import mongoose from "mongoose";

const commentScehma = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentScehma);
export default Comment;
