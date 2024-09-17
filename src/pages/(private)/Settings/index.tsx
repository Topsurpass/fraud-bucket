import { Link, Outlet, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

const SettingLinks = [
	{
		title: "Profile",
		path: "/settings/profile",
	},
	{
		title: "Users",
		path: "/settings/users",
	},
	// {
	// 	title: "Users",
	// 	path: "/settings/users",
	// },
	// {
	// 	title: "Roles & Permissions",
	// 	path: "/setting/roles",
	// },
	{
		title: "Change Password",
		path: "/settings/change-password",
	},
];

export default function Settings() {
	const { pathname } = useLocation();

	return (
		<section>
			<div className="">
				<h2 className="text-2xl font-semibold">Settings</h2>
				<h4 className="text-base text-gray-600">
					Customize and edit essential details
				</h4>
			</div>
			<div className="mt-10 flex gap-3 border-b-[1.5px]">
				{SettingLinks.map((item) => {
					return (
						<Link
							key={item.title}
							to={item.path}
							className={cn(
								buttonVariants({
									variant: "ghost",
									className: cn(
										"rounded-none border-b-blue-600 hover:border-b-[3px] hover:bg-transparent",
										{
											"border-b-[3px] border-b-blue-600":
												item.path === pathname,
										},
									),
								}),
							)}
						>
							{item.title}
						</Link>
					);
				})}
			</div>
			<div className="p-4">
				<Outlet />
			</div>
		</section>
	);
}
