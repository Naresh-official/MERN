import Sidebar from "@/components/sidebar/Sidebar.jsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setTheme } from "@/store/features/themeSlice.js";
import { Toaster } from "@/components/ui/toaster.jsx";
import axios from "axios";
import { login, logout } from "@/store/features/authSlice.js";

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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BASE_URL || ""}/api/v1/user/me`,
                    { withCredentials: true }
                );
                if (data?.data?.success) {
                    dispatch(login(data.data.user));
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    dispatch(logout());
                    localStorage.removeItem("user");
                    navigate("/login");
                }
            }
        };
        checkAuth();
    }, []);
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
