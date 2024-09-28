import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="bg-blue-800 text-white py-10 px-32 flex justify-between items-center">
            <h1 className="text-white text-5xl font-semibold">
                <Link to="/">Holidays.com</Link>
            </h1>
            <div className="flex gap-4 font-medium">
                <h3>Privacy Policy</h3>
                <h3>Terms of Use</h3>
            </div>
        </div>
    );
}

export default Footer;
