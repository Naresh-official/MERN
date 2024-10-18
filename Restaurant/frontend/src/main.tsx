import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={route} />,
);
