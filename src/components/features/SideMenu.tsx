import { NavLink } from "react-router-dom";
import { navLinks } from "@/data/menu-data";
import { cn } from "@/utils";

export default function SideMenu() {
	return (
		<div className="h-screen w-full">
			<NavBarMiddle />
		</div>
	);
}

// export function NavBarMiddle() {
// 	return (
// 		<div className="hidden w-full md:flex md:flex-col md:items-center md:justify-center">
// 			{navLinks.map((link, idx) => (
// 				<NavLink
// 					to={link.path}
// 					key={idx}
// 					className={({ isActive }) =>
// 						cn(
// 							`justify-left flex h-[50px] w-[90%] rounded-md items-center text-center text-2xl text-black hover:text-etzBlue-500`,
// 							{ "bg-white hover:text-black": isActive },
// 						)
// 					}
// 				>
// 					<div className="flex gap-3 px-3 text-left">
// 						<div>{link.icon}</div>
// 						<p className="text-sm">{link.name}</p>
// 					</div>
// 				</NavLink>
// 			))}
// 		</div>
// 	);
// }


export function NavBarMiddle() {
	return (
		<div className="hidden sidebar-top md:fixed md:flex flex-col items-center  bg-gray-100 backdrop-blur">
			{navLinks.map((link, idx) => (
				<NavLink
					to={link.path}
					key={idx}
					className={({ isActive }) =>
						cn(
							`justify-left flex h-[50px] w-[90%] items-center rounded-md text-center text-2xl text-black hover:text-etzBlue-500`,
							{ "bg-white hover:text-black": isActive },
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
