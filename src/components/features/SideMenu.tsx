import { NavLink } from "react-router-dom";
import { navLinks } from "@/data/menu-data";
import { cn } from "@/utils";


export default function SideMenu() {
	return (
		<aside className="hidden w-0 bg-gray-100 px-5 md:fixed md:bottom-0 md:top-[100px] md:z-10 md:flex md:flex-col md:gap-2 md:w-[300px] md:pt-3 font-bold ">
			{navLinks.map((link, idx) => (
				<NavLink
					to={link.path}
					key={idx}
					className={({ isActive }) =>
						cn(
							"flex h-[50px] w-full items-center rounded-md text-2xl text-gray-500 hover:text-etzBlue-500",
							{ "bg-white hover:text-black": isActive },
						)
					}
				>
					<div className="flex gap-3 px-3">
						<div>{link.icon}</div>
						<p className="text-sm">{link.name}</p>
					</div>
				</NavLink>
			))}
		</aside>
	);
}
