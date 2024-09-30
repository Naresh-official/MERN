import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
