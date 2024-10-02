import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setTheme } from "@/store/features/themeSlice.js";

import { GoHome } from "react-icons/go";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdOutlineExplore, MdOutlineLogout } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { RiAddBoxLine } from "react-icons/ri";
import { BsBrightnessHigh } from "react-icons/bs";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
    const navItems = [
        {
            icon: GoHome,
            name: "Home",
            link: "/",
        },
        {
            icon: IoSearch,
            name: "Search",
            link: "/search",
        },
        {
            icon: MdOutlineExplore,
            name: "Explore",
            link: "/explore",
        },
        {
            icon: RiMessengerLine,
            name: "Messages",
            link: "/messages",
        },
        {
            icon: FaRegHeart,
            name: "Notifications",
            link: "/notifications",
        },
        {
            icon: RiAddBoxLine,
            name: "Create",
            link: "/create",
        },
    ];
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL || ""}/api/v1/user/logout`,
                { withCredentials: true }
            );
            if (data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const toggleTheme = () => {
        if (theme === "light") {
            dispatch(setTheme("dark"));
        } else {
            dispatch(setTheme("light"));
        }
    };

    return (
        <div className="border-r-2 border-netral-500 dark:border-neutral-800 flex flex-col gap-4 p-2 lg:pr-10 items-start justify-between py-6">
            <div>
                <img
                    src={`${
                        theme === "light" ? "/logo-light.png" : "/logo-dark.png"
                    }`}
                    alt="Instagram"
                    className="w-28 hidden lg:block"
                />
                <ul className="flex flex-col gap-2 text-2xl">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className="p-2 rounded-lg cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                            <Link
                                to={item.link}
                                className="flex items-center gap-3 "
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="hidden lg:block">
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <span className="flex items-center gap-2 text-2xl">
                            <IoMenu className="w-8 h-8" />
                            <span className="hidden lg:block">Menu</span>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 p-2">
                        <DropdownMenuItem>
                            <span className="flex items-center gap-2 text-lg">
                                <FaRegBookmark className="w-4 h-4" />
                                Saved
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={toggleTheme}>
                            <span className="flex items-center gap-2 text-lg">
                                <BsBrightnessHigh className="w-4 h-4" />
                                Switch Appearance
                            </span>
                        </DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <span className="flex items-center gap-2 text-lg p-2 text-red-500">
                                    <MdOutlineLogout className="w-4 h-4" />
                                    Logout
                                </span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        log you out of your account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleLogout}
                                        className="bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-500 dark:bg-red-700 dark:text-red-100"
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default Sidebar;
