import Sidebar from "@/components/sidebar/Sidebar.jsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Layout() {
    const { theme } = useSelector((state) => state.theme);
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    },[theme]);
    return (
        <div className={`flex h-screen w-screen`}>
            <Sidebar className="col-span-1" />
            <Outlet className="col-span-5" />
        </div>
    );
}

export default Layout;
