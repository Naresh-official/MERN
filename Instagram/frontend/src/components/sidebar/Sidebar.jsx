import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
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

function Sidebar() {
    const navItems = [
        {
            icon: GoHomeFill,
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

    return (
        <div className="border-r-2 border-netral-500 flex flex-col gap-4 p-2 items-start justify-between py-6">
            <div>
                <img
                    src="https://logos-world.net/wp-content/uploads/2020/05/Instagram-Logo-2016-present.png"
                    alt="Instagram"
                    className="w-28"
                />
                <ul className="flex flex-col gap-2 text-2xl">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-neutral-200"
                        >
                            <item.icon className="w-6 h-6" />
                            <Link to={item.link}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <span className="flex items-center gap-2 text-2xl">
                            <IoMenu className="w-8 h-8" />
                            Menu
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 p-2">
                        <DropdownMenuItem>
                            <span className="flex items-center gap-2 text-lg">
                                <FaRegBookmark className="w-4 h-4" />
                                Saved
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span className="flex items-center gap-2 text-lg">
                                <BsBrightnessHigh className="w-4 h-4" />
                                Switch Appearance
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
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
                                            This action cannot be undone. This
                                            will log you out of your account.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                            className="bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default Sidebar;
