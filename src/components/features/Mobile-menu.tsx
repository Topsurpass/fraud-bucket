import { cn } from "@/utils";
import { navLinks } from "@/data/menu-data";
import { NavLink } from "react-router-dom";

export default function MobileMenu() {
	return (
		<div>
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
