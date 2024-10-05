import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import CommentDialog from "./CommentDialog.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { login } from "@/store/features/authSlice.js";

function Post({ post }) {
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const { user } = useSelector((state) => state.auth);
    const [isSaved, setIsSaved] = useState(
        user.saved?.includes(post._id) || false
    );
    const dispatch = useDispatch();

    const getDays = () => {
        const milliseconds = new Date() - new Date(post.createdAt);
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        if (days > 0) {
            return `${days} d`;
        }
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        if (hours > 0) {
            return `${hours} h`;
        }
        const minutes = Math.floor(milliseconds / (1000 * 60));
        if (minutes > 0) {
            return `${minutes} m`;
        }
        const seconds = Math.floor(milliseconds / 1000);
        if (seconds > 0) {
            return `${seconds} s`;
        }
        return "1 s";
    };
    const handleLike = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/like/${
                    post._id
                }`,
                { withCredentials: true }
            );
            if (data.success) {
                if (data?.message === "liked") {
                    setLikesCount(likesCount + 1);
                } else {
                    setLikesCount(likesCount - 1);
                }
                setIsLiked(!isLiked);
            }
            return;
        } catch (error) {
            console.log(error);
        }
    };
    const handleSave = async () => {
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/post/save/${
                    post._id
                }`,
                {},
                { withCredentials: true }
            );
            if (data.success) {
                if (data?.message === "Post saved successfully") {
                    dispatch(
                        login({ ...user, saved: [...user.saved, post._id] })
                    );
                    setIsSaved(true);
                } else {
                    dispatch(
                        login({
                            ...user,
                            saved: user.saved.filter((p) => p !== post._id),
                        })
                    );
                    setIsSaved(false);
                }
            }
            return;
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-[450px] border-t-2 text-black dark:text-white border-neutral-200 dark:border-neutral-500 pt-4 px-2">
            {/* Post creator details */}
            <div className="flex items-center gap-2">
                <img
                    src={post?.owner?.profileImg}
                    alt=""
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col leading-tight">
                    <h2 className="text-lg font-semibold">
                        {post?.owner?.username}
                        <span className="dark:text-zinc-300 text-zinc-700 text-sm ml-2 font-normal">
                            · {getDays()}
                        </span>
                    </h2>
                    <p>
                        {post?.owner?.firstName} {post?.owner?.lastName}
                        {user._id === post?.owner?._id && (
                            <span className="text-zinc-500 dark:text-zinc-400 font-bold">
                                you
                            </span>
                        )}
                    </p>
                </div>
            </div>
            {/* Post image */}
            <div className="w-full mt-4">
                <img
                    src={post.image}
                    alt=""
                    className="w-full h-[562px] object-cover rounded-md"
                />
            </div>
            {/* Post actions */}
            <div className="w-full mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isLiked ? (
                            <FaHeart
                                onClick={handleLike}
                                className="text-[#ff3040] w-6 h-6 cursor-pointer"
                            />
                        ) : (
                            <FaRegHeart
                                onClick={handleLike}
                                className="w-6 h-6 cursor-pointer"
                            />
                        )}
                        <CommentDialog />
                        <FiSend className="w-6 h-6" />
                    </div>
                    <div>
                        {isSaved ? (
                            <IoBookmark
                                onClick={handleSave}
                                className="w-6 h-6 cursor-pointer"
                            />
                        ) : (
                            <IoBookmarkOutline
                                onClick={handleSave}
                                className="w-6 h-6 cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                <p className="text-xs mt-2 font-semibold">{likesCount} Likes</p>
                <h3 className="text-sm font-semibold">mrwhosetheboss</h3>
            </div>
            {/* Post comments */}
            <div className="w-full mt-2 flex items-center justify-between">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full outline-none bg-transparent"
                />
                {comment && comment.trim().length > 0 && (
                    <button
                        className="text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={() => setComment("")}
                    >
                        Post
                    </button>
                )}
            </div>
        </div>
    );
}

export default Post;
