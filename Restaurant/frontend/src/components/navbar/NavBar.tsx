import { Link } from "react-router-dom";
import { Menu, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

function NavBar() {
    return (
        <div className="fixed w-screen top-0 z-10 bg-neutral-950 shadow-sm shadow-orange-900">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link to={"/"} className="flex items-center justify-center">
                    <UtensilsCrossed className="h-6 w-6 text-orange-400" />
                    <span className="ml-2 text-3xl font-bold text-orange-400">
                        MernEats
                    </span>
                </Link>
                <nav className="ml-auto hidden lg:flex items-center gap-4 sm:gap-6 text-md font-medium ">
                    <Link to={"/cart"}>
                        <ShoppingCart />
                    </Link>
                    <Link className="" to={"/menu"}>
                        Menu
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4"
                        to={"/about"}
                    >
                        About
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4"
                        to={"/"}
                    >
                        Contact
                    </Link>
                    <Button className="bg-orange-600 text-white hover:bg-orange-700 text-md px-6">
                        <Link to={"/login"}>Login</Link>
                    </Button>
                    <Button
                        variant={"outline"}
                        className="text-orange-400 hover:text-orange-500 text-md px-6 border-2 border-orange-500"
                    >
                        <Link to={"/signup"}>Sign Up</Link>
                    </Button>
                </nav>
                <div className="lg:hidden ml-auto">
                    <Sheet>
                        <SheetTrigger>
                            <Menu />
                        </SheetTrigger>
                        <SheetContent className="bg-neutral-900">
                            <SheetHeader>
                                <SheetTitle>
                                    <span className="text-orange-500 text-xl">
                                        MernEats
                                    </span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="border-t-2 border-orange-500">
                                <ul className="flex flex-col text-white">
                                    <li>
                                        <Link
                                            className="hover:underline underline-offset-4 block px-4 py-2"
                                            to={"/"}
                                        >
                                            Menu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="hover:underline underline-offset-4 block px-4 py-2"
                                            to={"/"}
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="hover:underline underline-offset-4 block px-4 py-2"
                                            to={"/"}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="hover:underline underline-offset-4 block px-4 py-2"
                                            to={"/login"}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="hover:underline underline-offset-4 block px-4 py-2"
                                            to={"/signup"}
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </div>
    );
}

export default NavBar;
