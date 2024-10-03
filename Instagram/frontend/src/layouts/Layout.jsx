import Sidebar from "@/components/sidebar/Sidebar.jsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setTheme } from "@/store/features/themeSlice.js";
import { Toaster } from "@/components/ui/toaster.jsx";

function Layout() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    }, [theme]);
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return (
        <div className={`flex h-screen w-screen`}>
            <Sidebar className="" />
            <div className="w-full overflow-y-auto">
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
}

export default Layout;
