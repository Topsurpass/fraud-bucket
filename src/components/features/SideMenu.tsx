import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/data/menu-data";
import { cn } from "@/utils";

export default function SideMenu() {
	return (
		<div className="h-screen w-full">
			<NavBarMiddle />
			<div className="justify-left fixed bottom-0 z-20 flex h-[50px] items-center md:w-[250px] md:px-2 lg:w-[228px] lg:px-4">
				<Link
					to={"/support"}
					className="rounded bg-etzBlue-500 px-10 py-2 text-center text-sm"
				>
					Need support ?
				</Link>
			</div>
		</div>
	);
}

export function NavBarMiddle() {
	return (
		<div className="hidden w-full md:flex md:flex-col md:items-center md:justify-center">
			{navLinks.map((link, idx) => (
				<NavLink
					to={link.path}
					key={idx}
					className={({ isActive }) =>
						cn(
							`justify-left flex h-[50px] w-full items-center text-center text-2xl text-white hover:text-etzBlue-500`,
							{ "bg-etzBlue-500 hover:text-white": isActive },
						)
					}
				>
					<div className="flex gap-3 px-3 text-left">
						<div>{link.icon}</div>
						<p className="text-sm">{link.name}</p>
					</div>
				</NavLink>
			))}
		</div>
	);
}
