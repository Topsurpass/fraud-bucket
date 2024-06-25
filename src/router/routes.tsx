import ErrorPage from "@/pages/Error";
import DashboardLayout from "@/layout/dashboard-layout";
import HomePage from "@/pages/(public)/Login";
import Dashboard from "@/pages/(private)/Dashboard";
import Analysis from "@/pages/(private)/Analysis";
import Transactions from "@/pages/(private)/Transactions";
import Cases from "@/pages/(private)/Cases";
import Files from "@/pages/(private)/Files";
import Settings from "@/pages/(private)/Settings";
import Collaboration from "@/pages/(private)/Collaboration";
import ProtectedRoute from "@/router/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <HomePage />,
	},
	{
		element: (
			<ProtectedRoute>
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/transactions",
				element: <Transactions />,
			},
			{
				path: "/cases",
				element: <Cases />,
			},
			{
				path: "/files",
				element: <Files />,
			},
			{
				path: "/analysis",
				element: <Analysis />,
			},
			{
				path: "/collaboration",
				element: <Collaboration />,
			},
			{
				path: "/settings",
				element: <Settings />,
			},
		],
		errorElement: <ErrorPage />,
	},
]);
