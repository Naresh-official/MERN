import { Button } from "@/components/ui/button";
import { isValidEmailType } from "@/lib/services";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [err, setErr] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [formData, setFormData] = useState<{
        fullName: string;
        email: string;
        password: string;
        contact: number;
        address: string;
        city: string;
        state: string;
    }>({
        fullName: "",
        email: "",
        password: "",
        contact: 0,
        address: "",
        city: "",
        state: "",
    });
    const navigate = useNavigate();

    const checkEmailIsUnique = async (email: string) => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_BASE_URL || ""
                }/api/v1/user/check/${email}`
            );
            if (data?.data.found) return false;
            return true;
        } catch (error: any) {
            setErr(error?.message || "Internal server error");
        }
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
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
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/user/signup`,
                formData,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                navigate("/login");
            }
        } catch (error: any) {
            setErr(error.message);
        }
    };

    const handleNext = async () => {
        if (formData.fullName && formData.email && formData.password) {
            const isUnique = await checkEmailIsUnique(formData.email);
            if (!isUnique) {
                setErr("Email already exits");
                return;
            }
            setPage(2);
            setErr("");
        } else {
            setErr("Please fill all fields before proceeding");
        }
    };

    const handlePrevious = () => {
        setPage(1);
        setErr("");
    };
    return (
        <div className="w-full min-h-screen h-full flex justify-center items-center">
            <div className="md:w-[500px] w-[90%] flex flex-col items-center p-4 rounded-xl border-2 border-orange-500">
                <h1 className="text-5xl font-bold text-orange-500">
                    Mern Eats
                </h1>
                <h3 className="text-2xl mt-10 mb-5">Create your account</h3>
                <style>{`
                    .no-spinner::-webkit-inner-spin-button,
                    .no-spinner::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    .no-spinner {
                        -moz-appearance: textfield;
                    }
                `}</style>
                <form
                    onSubmit={handleSignup}
                    className="w-full flex flex-col gap-6 text-xl"
                >
                    {page === 1 ? (
                        <>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none"
                            />
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
                                type="button"
                                onClick={handleNext}
                                className="w-full text-xl mt-5 bg-orange-600 hover:bg-orange-500"
                            >
                                Next
                            </Button>
                        </>
                    ) : (
                        <>
                            <input
                                type="number"
                                placeholder="Contact Number"
                                value={
                                    formData.contact === 0
                                        ? ""
                                        : formData.contact
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        contact: Number(e.target.value),
                                    })
                                }
                                className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none no-spinner"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        city: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={formData.state}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        state: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 rounded-md bg-zinc-800 outline-none"
                            />
                            {err && (
                                <p className="text-red-600 font-medium text-lg">
                                    {err}
                                </p>
                            )}
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="w-1/2 text-xl mt-5 bg-zinc-900 hover:bg-zinc-800 border-2 border-orange-500"
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-1/2 text-xl mt-5 bg-orange-600 hover:bg-orange-500"
                                >
                                    Signup
                                </Button>
                            </div>
                        </>
                    )}
                </form>

                <p className="mt-4 text-xl">
                    Alredy have an account ?{" "}
                    <Link
                        to="/login"
                        className="text-orange-600 font-medium hover:underline cursor-pointer"
                    >
                        Login In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
