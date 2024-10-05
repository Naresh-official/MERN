import React, { useEffect, useState } from "react";
import Post from "./Post.jsx";
import axios from "axios";

function Feed() {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/post/getall`,
                { withCredentials: true }
            );
            if (data.success) {
                setPosts(data.data.posts);
            }
            console.log(data.data.posts);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
}

export default Feed;
