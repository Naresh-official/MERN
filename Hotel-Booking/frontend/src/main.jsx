import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

// import pages
import Layout from "./layouts/Layout";
import Home from "./components/pages/Home.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import Login from "./components/pages/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
