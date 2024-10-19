import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Signup from "./pages/auth/Signup.tsx";
import VerifyEmail from "./pages/auth/VerifyEmail.tsx";
import Landing from "./pages/Landing.tsx";
import Layout from "./Layout.tsx";
import MenuPage from "./pages/Menu.tsx";
import Cart from "./pages/Cart.tsx";
import About from "./pages/About.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const route = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/menu",
                element: <MenuPage />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/verify-account",
        element: <VerifyEmail />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={route} />
);
