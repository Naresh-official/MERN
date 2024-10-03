import { Button } from "@/components/ui/button.jsx";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast.js";
import { useNavigate } from "react-router-dom";

// TODO : toast not working

function Create() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        caption: "",
        image: null,
    });
    const [error, setError] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData.image) return setError("Please upload an image");
        if (!formData.caption) return setError("Please add a caption");
        setError(null);
        try {
            const postData = new FormData();
            postData.append("image", formData.image);
            postData.append("caption", formData.caption);
            console.log(postData.get("image"));
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/post/create`,
                postData,
                { withCredentials: true }
            );
            if (data.success) {
                toast({
                    title: "Post created successfully",
                    description: "Redirecting to home page",
                    variant: "success",
                });
                return navigate("/");
            }
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
        }
    };
    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="xl:w-[50%] md:w-[70%] w-[90%] bg-white md:p-10 p-5 md:px-20 px-5 rounded-lg dark:bg-neutral-800 shadow-md dark:shadow-black shadow-neutral-200">
                <h1 className="text-3xl font-semibold text-center">Create</h1>
                <form
                    onSubmit={handleCreate}
                    className="flex flex-col gap-4 items-center mt-8"
                >
                    <div
                        onClick={() => document.getElementById("image").click()}
                        className={`w-[300px] h-[375px] ${
                            !formData.image ? "border-2" : "border-0"
                        } border-neutral-200 rounded-lg dark:border-neutral-500 flex items-center justify-center`}
                    >
                        {!formData.image && (
                            <p className="text-sm dark:text-zinc-400">
                                Upload your image
                            </p>
                        )}
                        {formData.image && (
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt=""
                                className="w-[300px] h-[375px] object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        name="image"
                        id="image"
                        className="hidden"
                    />
                    <input
                        type="text"
                        name="caption"
                        id="caption"
                        value={formData.caption}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                caption: e.target.value,
                            })
                        }
                        placeholder="Caption"
                        className="w-full p-2 border-2 border-neutral-200 outline-none rounded-lg dark:border-neutral-500 bg-transparent dark:text-neutral-50"
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 dark:text-white text-white text-xl font-medium"
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Create;
