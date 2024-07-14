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
import WelcomePage from "@/pages/(public)/Home";
import ProtectedRoute from "@/router/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <WelcomePage />,
	},
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
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: "/transactions",
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: "/cases",
				element: (
					<ProtectedRoute>
						<Cases />
					</ProtectedRoute>
				),
			},
			{
				path: "/files",
				element: (
					<ProtectedRoute>
						<Files />
					</ProtectedRoute>
				),
			},
			{
				path: "/analysis",
				element: (
					<ProtectedRoute>
						<Analysis />
					</ProtectedRoute>
				),
			},
			{
				path: "/collaboration",
				element: (
					<ProtectedRoute>
						<Collaboration />
					</ProtectedRoute>
				),
			},
			{
				path: "/settings",
				element: (
					<ProtectedRoute>
						<Settings />
					</ProtectedRoute>
				),
			},
			 
		],
		errorElement: <ErrorPage />,
	},
]);
