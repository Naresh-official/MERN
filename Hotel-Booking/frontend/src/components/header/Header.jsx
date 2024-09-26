import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="bg-blue-800 py-4 px-32">
            <div className="flex justify-between">
                <h1 className="text-white text-5xl font-semibold">
                    <Link to="/">Holidays.com</Link>
                </h1>
                <button className="bg-zinc-200 hover:bg-zinc-300 transition-colors duration-300 text-blue-800 px-6 py-2 text-xl rounded-xl font-medium">Log in</button>
            </div>
        </div>
    );
}

export default Header;
