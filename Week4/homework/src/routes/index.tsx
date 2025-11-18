import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts";
import LoginPage from "@/pages/Login/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
	{
		path: "/",
    errorElement: <NotFoundPage />,
		element: <Layout />,
		children: [
			{
				index: true,
				element: <LoginPage />,
			}, // Pages 추가
		],
	},
]);