import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../utils/services.js";
import axios from "axios";

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();
        if (formData.firstName === "")
            return setError("Please enter your first name");
        if (formData.firstName.trim().includes(" "))
            return setError("First name cannot contain spaces");
        if (formData.email === "") return setError("Please enter your email");
        if (!verifyEmail(formData.email))
            return setError("Please enter a valid email");
        if (formData.password === "")
            return setError("Please enter your password");
        if (formData.confirmPassword === "")
            return setError("Please confirm your password");
        if (formData.password !== formData.confirmPassword)
            return setError("Passwords do not match");
        setError(null);

        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/user/register",
                formData
            );
            if (data.success === true) return navigate("/login");
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                    error.message ||
                    "Something went wrong please try again"
            );
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="py-10">
                <h1 className="text-4xl font-semibold my-5">
                    Create an account
                </h1>
                <form
                    onSubmit={handleSignUp}
                    className="flex flex-col w-[800px] text-lg"
                >
                    <div className="flex justify-between gap-4">
                        <label className="font-medium text-zinc-600 ">
                            First Name
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
                                className="w-full border-2 text-black font-normal border-zinc-300 focus:caret-blue-800 focus:border-blue-800 outline-none rounded-xl py-2 px-4 my-2"
                            />
                        </label>
                        <label className="font-medium text-zinc-600 ">
                            Last Name
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
                                className="w-full border-2 text-black font-normal border-zinc-300 focus:caret-blue-800 focus:border-blue-800 outline-none rounded-xl py-2 px-4 my-2"
                            />
                        </label>
                    </div>
                    <label className="font-medium text-zinc-600">
                        Email
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
                            className="w-full border-2 text-black font-normal border-zinc-300 focus:caret-blue-800 focus:border-blue-800 outline-none rounded-xl py-2 px-4 my-2"
                        />
                    </label>
                    <label className="font-medium text-zinc-600 ">
                        Password
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
                            className="w-full border-2 text-black font-normal border-zinc-300 focus:caret-blue-800 focus:border-blue-800 outline-none rounded-xl py-2 px-4 my-2"
                        />
                    </label>
                    <label className="font-medium text-zinc-600">
                        Confirm Password
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="w-full border-2 text-black font-normal border-zinc-300 focus:caret-blue-800 focus:border-blue-800 outline-none rounded-xl py-2 px-4 my-2"
                        />
                    </label>
                    {error && (
                        <p className="text-red-600 font-medium">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white cursor-pointer font-medium text-xl rounded-xl py-3 px-4 mt-8"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-zinc-600 text-md mt-2 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-800 text-lg font-semibold hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
