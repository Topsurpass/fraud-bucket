import ErrorPage from "@/pages/Error";
import DashboardLayout from "@/layout/dashboard-layout";
import Login from "@/pages/(public)/Login";
import Dashboard from "@/pages/(private)/Dashboard";
import Analysis from "@/pages/(private)/Analysis";
import Transactions from "@/pages/(private)/Transactions";
import Cases from "@/pages/(private)/Cases";
import Files from "@/pages/(private)/Files";
import Settings from "@/pages/(private)/Settings";
import Collaboration from "@/pages/(private)/Collaboration";
import ProtectedRoute from "@/router/ProtectedRoutes";
import PublicRoute from "@/router/public-route";
import PublicLayout from "@/layout/public-layout";

const routeConfig = [
	{
		// path: "/",
		element: (
			<PublicRoute>
				<PublicLayout />
			</PublicRoute>
		),
		children: [
			{
				index: true,
				path: "/login",
				element: <Login />,
			},
		],
	},
	{
		path: "/",
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
];
export default routeConfig;
