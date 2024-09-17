import { GrTransaction } from "react-icons/gr";
// import { IoIosBriefcase, IoMdAnalytics } from "react-icons/io";
// import { SiMicrosoftexcel } from "react-icons/si";
import { MdGroups, MdOutlineSettings } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { IoMoonSharp } from "react-icons/io5";
import { WiDaySunny } from "react-icons/wi";
import { IoLaptopOutline } from "react-icons/io5";


export const navLinks = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: <TfiDashboard />,
	},
	{
		name: "Transactions",
		path: "/transactions",
		icon: <GrTransaction />,
	},
	// {
	// 	name: "Cases",
	// 	path: "/cases",
	// 	icon: <IoIosBriefcase />,
	// },
	// {
	// 	name: "Files",
	// 	path: "/files",
	// 	icon: <SiMicrosoftexcel />,
	// },
	// {
	// 	name: "Analysis",
	// 	path: "/analysis",
	// 	icon: <IoMdAnalytics />,
	// },
	{
		name: "Collaboration",
		path: "/collaboration",
		icon: <MdGroups />,
	},
	{
		name: "Settings",
		path: "/settings/users",
		icon: <MdOutlineSettings />,
	},
];

export const Links = [
	{
		label: "My Profile",
		href: "/settings/profile",
	},
	{
		label: "Change Password",
		href: "/settings/change-password",
	},
];

export const dayAndNight = [
	{
		label: "Light",
		icon: <WiDaySunny />,
	},
	{
		label: "Dark",
		icon: <IoMoonSharp />,
	},
	{
		label: "Sytem",
		icon: <IoLaptopOutline />,
	},
];
