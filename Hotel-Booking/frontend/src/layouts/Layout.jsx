import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";
import { useDispatch } from "react-redux";
import { logout, login } from "../store/features/authSlice.js";
import axios from "axios";

function Layout() {
    const dispatch = useDispatch();
    const fetchcurrentUser = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL || "";
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/user/me`, {
                withCredentials: true,
            });
            if (data.success) {
                dispatch(login(data?.data));
            }
        } catch (error) {
            dispatch(logout());
        }
    };

    useEffect(() => {
        fetchcurrentUser();
    }, []);

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
