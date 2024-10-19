import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

function Layout() {
    return (
        <div className="bg-black text-white min-h-screen w-screen overflow-x-hidden">
            <NavBar />
            <Outlet />
        </div>
    );
}

export default Layout;
