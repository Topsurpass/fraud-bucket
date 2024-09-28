import ErrorPage from "@/pages/Error";
import DashboardLayout from "@/layout/dashboard-layout";
import Login from "@/pages/(public)/Login";
import Dashboard from "@/pages/(private)/Dashboard";
import Analysis from "@/pages/(private)/Analysis";
import Transactions from "@/pages/(private)/Transactions";
import Cases from "@/pages/(private)/Cases";
import Files from "@/pages/(private)/Files";
import SettingsLayout from "@/pages/(private)/Settings";
import Collaboration from "@/pages/(private)/Collaboration";
import ProtectedRoute from "@/router/ProtectedRoutes";
import PublicRoute from "@/router/public-route";
import PublicLayout from "@/layout/public-layout";
// import Configuration from "@/pages/(private)/Settings/settiings";
import Users from "@/pages/(private)/Settings/users";
import ChangePassword from "@/pages/(private)/Settings/change-password";
import Profile from "@/pages/(private)/Settings/profile";
import ForgotPassword from "@/pages/(public)/forgot-password";
import ResetPassword from "@/pages/(public)/reset-password";

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
			{
				path: "forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "/reset-password/:passcode?",
				element: <ResetPassword />,
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
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "transactions",
				element: <Transactions />,
			},
			{
				path: "cases",
				element: <Cases />,
			},
			{
				path: "files",
				element: <Files />,
			},
			{
				path: "analysis",
				element: <Analysis />,
			},
			{
				path: "collaboration",
				element: <Collaboration />,
			},
			{
				path: "settings",
				element: <SettingsLayout />,
				children: [
					{
						// index: true,
						path: "users",
						element: <Users />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "change-password",
						element: <ChangePassword />,
					},
				],
			},
		],
		errorElement: <ErrorPage />,
	},
];
export default routeConfig;
