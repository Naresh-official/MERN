import Sidebar from "@/components/sidebar/Sidebar.jsx";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="grid grid-cols-6 h-screen w-screen">
            <Sidebar className="col-span-1" />
            <Outlet className="col-span-5" />
        </div>
    );
}

export default Layout;
