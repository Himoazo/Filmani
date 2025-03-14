import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"
import ReviewsPage from "../pages/ReviewsPage";
import LoginPage from "../pages/LoginPage";
import Layout from "../Components/Layout";
import SingleMediaPage from "../pages/SingleMediaPage";
import RegisterPage from "@/pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/media/:id",
                element: <SingleMediaPage/> 
            },
            {
                path: "/reviews",
                element: <ReviewsPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    }
]);

export default router;