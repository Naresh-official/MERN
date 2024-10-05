import { Button } from "@/components/ui/button.jsx";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/features/authSlice.js";

function Login() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const { theme } = useSelector((state) => state.theme);
    const usernameOrEmailRef = useRef(null);

    useEffect(() => {
        if (usernameOrEmailRef.current) {
            usernameOrEmailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
            return;
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (formData.emailOrUsername === "") {
                setError("Please enter an email or username");
                return;
            } else if (formData.password === "") {
                setError("Please enter a password");
                return;
            }
            setError(null);
            setFormData({
                ...formData,
                emailOrUsername: formData.emailOrUsername.trim().toLowerCase(),
            });
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/user/login`,
                formData,
                { withCredentials: true }
            );
            if (data.success) {
                toast({
                    title: "Login successful",
                    description: "Redirecting to home page",
                    variant: "success",
                });
                dispatch(login(data.data.user));
                localStorage.setItem("user", JSON.stringify(data.data.user));
                navigate("/");
                return;
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
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
            <div className="md:w-[400px] w-[350px] p-4 border-2 border-gray-300 dark:bg-neutral-950 dark:border-neutral-700 rounded-lg shadow-lg">
                <div>
                    <img
                        src={`${
                            theme === "light"
                                ? "/logo-light.png"
                                : "/logo-dark.png"
                        }`}
                        alt="Instagram"
                        className="w-52 mx-auto"
                    />
                    <p className="text-center text-zinc-500 font-bold mx-10">
                        Log in to see photos and videos from your friends.
                    </p>
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-4 mt-5"
                    >
                        <input
                            type="text"
                            ref={usernameOrEmailRef}
                            placeholder="Username or email"
                            value={formData.emailOrUsername}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    emailOrUsername: e.target.value,
                                })
                            }
                            className="lowercase border-2 border-gray-300 dark:border-neutral-700 bg-transparent p-2 w-full rounded-lg outline-none"
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
                            className="border-2 border-gray-300 dark:border-neutral-700 bg-transparent p-2 w-full rounded-lg outline-none"
                        />
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <Button className="w-full bg-sky-500 dark:bg-sky-700 hover:bg-sky-600 dark:hover:bg-sky-800 dark:text-neutral-50">
                            Log in
                        </Button>
                    </form>
                </div>
            </div>
            <div className="md:w-[400px] w-[350px] p-4 border-2 border-gray-300 dark:bg-neutral-950 dark:border-neutral-700  rounded-lg shadow-lg">
                <p className="text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-sky-600 hover:text-sky-700 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
