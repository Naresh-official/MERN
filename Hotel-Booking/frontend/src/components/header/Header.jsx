import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout as logoutAction } from "../../store/features/authSlice.js";

function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    async function logout() {
        try {
            const { data } = await axios.get(
                "http://localhost:8000/api/v1/user/logout",
                { withCredentials: true }
            );
            if (data.success) {
                dispatch(logoutAction());
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-blue-800 py-4 px-32">
            <div className="flex justify-between">
                <h1 className="text-white text-5xl font-semibold">
                    <Link to="/">Holidays.com</Link>
                </h1>

                {isLoggedIn ? (
                    <div className="flex gap-4">
                        <button className="bg-white text-blue-800 hover:bg-zinc-200 border-2 transition-colors duration-300 px-6 py-2 text-xl rounded-xl font-medium">
                            <Link to="/my-bookings">My Bookings</Link>
                        </button>
                        <button className="bg-white text-blue-800 hover:bg-zinc-200 border-2 transition-colors duration-300 px-6 py-2 text-xl rounded-xl font-medium">
                            <Link to="/my-hotels">My Hotels</Link>
                        </button>
                        <button
                            onClick={logout}
                            className="text-white hover:bg-red-600 hover:bg-opacity-80 border-2 border-white hover:border-red-600 transition-colors duration-300 px-6 py-2 text-xl rounded-xl font-medium"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button className="text-white hover:bg-zinc-200 hover:bg-opacity-20 border-2 border-white transition-colors duration-300 px-6 py-2 text-xl rounded-xl font-medium">
                            <Link to="/signup">Sign up</Link>
                        </button>
                        <button className="bg-white hover:bg-zinc-200 transition-colors duration-300 text-blue-800 px-6 py-2 text-xl rounded-xl font-medium">
                            <Link to="/login">Log in</Link>
                        </button>
                    </div>
                )}
            </div>
            <div className="py-10">
                <h2 className="text-white text-3xl font-medium">
                    Find your next holiday
                </h2>
                <p className="text-white">
                    search low price hotels for your trip
                </p>
            </div>
        </div>
    );
}

export default Header;
