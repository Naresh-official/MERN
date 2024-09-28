import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="bg-blue-800 py-4 px-32">
            <div className="flex justify-between">
                <h1 className="text-white text-5xl font-semibold">
                    <Link to="/">Holidays.com</Link>
                </h1>
                <div className="flex gap-4">
                    <button className="text-white hover:bg-zinc-200 hover:bg-opacity-20 border-2 border-white transition-colors duration-300 px-6 py-2 text-xl rounded-xl font-medium">
                        <Link to="/signup">Sign up</Link>
                    </button>
                    <button className="bg-white hover:bg-zinc-200 transition-colors duration-300 text-blue-800 px-6 py-2 text-xl rounded-xl font-medium">
                        <Link to="/login">Log in</Link>
                    </button>
                </div>
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
