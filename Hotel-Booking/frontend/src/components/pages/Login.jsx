import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../lib/services.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { login } from "../../store/features/authSlice.js";
import { useDispatch } from "react-redux";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const baseUrl = import.meta.env.VITE_BASE_URL || " ";

    async function handleLogin(e) {
        e.preventDefault();
        if (formData.email === "") return setError("Please enter your email");
        if (!verifyEmail(formData.email))
            return setError("Please enter a valid email");
        if (formData.password === "")
            return setError("Please enter your password");
        setError(null);
        try {
            const { data } = await axios.post(
                `${baseUrl}/api/v1/user/login`,
                formData,
                { withCredentials: true }
            );
            if (data.success === true) {
                dispatch(login(data?.data));
                return navigate("/");
            }
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
                    onSubmit={handleLogin}
                    className="flex flex-col w-[800px] text-lg"
                >
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
                            className="w-full border-2 border-zinc-300 text-black font-normal focus:caret-blue-800 focus:border-blue-800 outline-none rounded-xl py-2 px-4 my-2"
                        />
                    </label>
                    {error && (
                        <p className="text-red-600 font-medium">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white cursor-pointer font-medium text-xl rounded-xl py-3 px-4 mt-8"
                    >
                        Log in
                    </button>
                </form>
                <p className="text-zinc-600 text-md mt-2 text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-800 text-lg font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
