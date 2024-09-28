import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";

function Layout() {
    return (
        <div>
            <Header />
            <div className="min-h-[60vh] px-32">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
