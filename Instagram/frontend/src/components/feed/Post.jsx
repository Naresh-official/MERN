import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { FiBookmark, FiSend } from "react-icons/fi";

function Post() {
    return (
        <div className="w-[450px] border-t-2 text-black dark:text-white border-neutral-200 dark:border-neutral-500 pt-4 px-2">
            <div className="flex items-center gap-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    alt=""
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col leading-tight">
                    <h2 className="text-lg font-semibold">
                        mrwhosetheboss{" "}
                        <span className="dark:text-zinc-300 text-zinc-700 text-sm font-normal">
                            · 1d
                        </span>
                    </h2>
                    <p>Arun Maini</p>
                </div>
            </div>
            <div className="w-full mt-4">
                <img
                    src="sample.jpg"
                    alt=""
                    className="w-full h-[562px] object-cover rounded-md"
                />
            </div>
            <div className="w-full mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* <FaRegHeart /> */}
                        <FaHeart className="text-[#ff3040] w-6 h-6" />
                        <TbMessageCircle className="w-6 h-6" />
                        <FiSend className="w-6 h-6" />
                    </div>
                    <div>
                        <FiBookmark className="w-6 h-6" />
                    </div>
                </div>
                <p className="text-xs mt-2 font-semibold">100 Likes</p>
                <h3 className="text-sm font-semibold">mrwhosetheboss</h3>
            </div>
        </div>
    );
}

export default Post;
