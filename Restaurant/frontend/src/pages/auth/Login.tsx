import { Button } from "@/components/ui/button";
import { isValidEmailType } from "@/lib/services";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [err, setErr] = useState<string>("");
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.password) {
                throw new Error("Please fill in all fields");
            }
            if (!isValidEmailType(formData.email)) {
                throw new Error("Please enter a valid email address");
            }
            setErr("");
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/user/login`,
                formData,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                navigate("/");
            }
        } catch (error: any) {
            if (error?.response?.data?.message === "Please verify your email") {
                navigate("/verify-account");
            }
            setErr(error.message);
        }
    };
    return (
        <div className="w-full min-h-screen h-full flex justify-center items-center">
            <div className="md:w-[500px] w-[90%] flex flex-col items-center p-4 rounded-xl border-2 border-orange-500 ">
                <h1 className="text-5xl font-bold text-orange-500">
                    Mern Eats
                </h1>
                <h3 className="text-2xl mt-10 mb-5">Login to your account</h3>
                <form
                    onSubmit={handleLogin}
                    className="w-full flex flex-col gap-6 text-xl"
                >
                    <input
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none"
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
                        className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none"
                    />
                    {err && (
                        <p className="text-red-600 font-medium text-lg">
                            {err}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="w-full text-xl mt-5 bg-orange-600 hover:bg-orange-500"
                    >
                        Login
                    </Button>
                </form>

                <p className="mt-4 text-xl">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-orange-600 font-medium hover:underline cursor-pointer"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
