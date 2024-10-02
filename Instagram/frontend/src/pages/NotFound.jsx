import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center text-2xl">
            <h1 className="text-4xl">404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500">Go back to Home</Link>
        </div>
    );
}

export default NotFound;
