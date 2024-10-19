import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

function Layout() {
    return (
        <div className="bg-black text-white min-h-screen w-screen overflow-x-hidden">
            <NavBar />
            <Outlet/>
            <div className="mb-auto">
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
