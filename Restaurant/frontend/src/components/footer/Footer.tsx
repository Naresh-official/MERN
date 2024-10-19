import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-orange-800">
            <p className="text-xs text-orange-400">
                © 2024 MernEats. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link
                    className="text-xs hover:underline underline-offset-4"
                    to={"/"}
                >
                    Terms of Service
                </Link>
                <Link
                    className="text-xs hover:underline underline-offset-4"
                    to={"/"}
                >
                    Privacy
                </Link>
            </nav>
        </footer>
    );
}

export default Footer;
