import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"
import ReviewsPage from "../pages/ReviewsPage";
import LoginPage from "../pages/LoginPage";
import Layout from "../Components/Layout";

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
                path: "/reviews",
                element: <ReviewsPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
]);

export default router;