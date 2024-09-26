import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./layouts/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // children: [
        //     {
        //         path: "/",
        //         element: <Home />,
        //     },
        // ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
