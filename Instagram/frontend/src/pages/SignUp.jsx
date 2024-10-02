import { Button } from "@/components/ui/button.jsx";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { validateEmail } from "@/lib/services.js";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast.js";

function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        gender: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (formData.email === "") return setError("Please enter an email");
            else if (!validateEmail(formData.email))
                return setError("Please enter a valid email");
            else if (formData.password === "")
                return setError("Please enter a password");
            else if (formData.firstName === "")
                return setError("Please enter your first name");
            else if (formData.lastName === "")
                return setError("Please enter your last name");
            else if (formData.username === "")
                return setError("Please enter a username");
            else if (formData.gender === "")
                return setError("Please select your gender");
            setError(null);
            console.log(import.meta.env.VITE_BASE_URL);

            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/user/register`,
                formData
            );
            if (data.success) {
                toast({
                    title: "Account created successfully",
                    description: "Redirecting to login page",
                    variant: "success",
                });
                return navigate("/login");
            }
        } catch (error) {
            console.log(error);
            setError(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
        }
    };

    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
            <div className="md:w-[400px] w-[350px] p-4 border-2 border-gray-300 rounded-lg shadow-lg">
                <div>
                    <img
                        src="https://logos-world.net/wp-content/uploads/2020/05/Instagram-Logo-2016-present.png"
                        alt="Instagram"
                        className="w-52 mx-auto"
                    />
                    <p className="text-center text-zinc-500 font-bold mx-10">
                        Sign up to see photos and videos from your friends.
                    </p>
                    <form
                        onSubmit={handleSignUp}
                        className="flex flex-col gap-4 mt-5"
                    >
                        <input
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="border-2 border-gray-300 bg-transparent p-2 w-full rounded-lg outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="border-2 border-gray-300 bg-transparent p-2 w-full rounded-lg outline-none"
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                            className="border-2 border-gray-300 bg-transparent p-2 w-full rounded-lg outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                            className="border-2 border-gray-300 bg-transparent p-2 w-full rounded-lg outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="border-2 border-gray-300 bg-transparent p-2 w-full rounded-lg outline-none"
                        />
                        <Select
                            className="bg-transparent"
                            value={formData.gender}
                            onValueChange={(value) =>
                                setFormData({ ...formData, gender: value })
                            }
                        >
                            <SelectTrigger
                                className={`w-[180px] bg-transparent border-2 border-gray-300 ${
                                    formData.gender === ""
                                        ? "text-zinc-400"
                                        : "text-zinc-900"
                                }`}
                            >
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent className="w-[180px] bg-zinc-50 border-2 border-gray-300 text-zinc-500">
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>

                        {error && <p className="text-red-500">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600"
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
            <div className="md:w-[400px] w-[350px] p-4 border-2 border-gray-300 rounded-lg shadow-lg">
                <p className="text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-sky-600 hover:text-sky-700 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
}

export default SignUp;
