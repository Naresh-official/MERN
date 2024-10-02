import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
