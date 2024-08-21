import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routeConfig from "@/router/route-config";

/** for tailwindcss debug screen */
if (import.meta.env.MODE === "development") {
	document.body.classList.add("debug-screens");
}

export default function RouteRenderer() {
	const router = createBrowserRouter(routeConfig);
	return <RouterProvider router={router} />;
}
