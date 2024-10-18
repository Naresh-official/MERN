import { Button } from "@/components/ui/button";
import { isValidEmailType } from "@/lib/services";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

function VerifyEmail() {
    const [err, setErr] = useState<string>("");
    const [formData, setFormData] = useState<{
        email: string;
        code: string;
    }>({
        email: "",
        code: "",
    });
    const navigate = useNavigate();

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.code) {
                throw new Error("Please fill in all fields");
            }
            if (!isValidEmailType(formData.email)) {
                throw new Error("Please enter a valid email address");
            }
            setErr("");
            const { data } = await axios.patch(
                `${
                    import.meta.env.VITE_BASE_URL || ""
                }/api/v1/user/verify?email=${formData.email}&code=${
                    formData.code
                }`,
                {
                    withCredentials: true,
                }
            );
            console.log(data);
            if (data.success) {
                navigate("/login");
            }
        } catch (error: any) {
            setErr(
                error?.response?.data?.message ||
                    error.message ||
                    "Internal server error"
            );
        }
    };
    return (
        <div className="w-full min-h-screen h-full flex justify-center items-center">
            <div className="md:w-[500px] w-[90%] flex flex-col items-center p-4 rounded-xl border-2 border-neutral-800 shadow-lg shadow-neutral-700">
                <h1 className="text-5xl font-bold text-orange-500">
                    Mern Eats
                </h1>
                <h3 className="text-2xl mt-10 mb-5">Login to your account</h3>
                <form
                    onSubmit={handleVerify}
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
                    <div className="w-full flex items-center justify-center">
                        <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            value={formData.code}
                            onChange={(newValue: string) =>
                                setFormData({
                                    ...formData,
                                    code: newValue,
                                })
                            }
                        >
                            <InputOTPGroup className="bg-zinc-800">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {err && (
                        <p className="text-red-600 font-medium text-lg">
                            {err}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="w-full text-xl mt-5 bg-orange-600 hover:bg-orange-500"
                    >
                        Verify Account
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

export default VerifyEmail;
