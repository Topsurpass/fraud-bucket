import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/data/menu-data";
import { cn } from "@/utils";


export default function SideMenu() {
	return (
		//  <div>This is the SideBar for menu</div>
		<div className="h-screen w-full">
			<NavBarMiddle />
			<div className="fixed bottom-0 z-20 flex h-[50px] w-[214px] items-center justify-center">
				<Link
					to={"#"}
					className=" rounded bg-blue-500 px-12 py-2  text-center"
				>
					Need support ?
				</Link>
			</div>
		</div>
	);
}

export function NavBarMiddle() {
	return (
		<div className="hidden w-full md:flex md:flex-col md:items-center md:justify-center ">
			{navLinks.map((link, idx) => (
				<NavLink
					to={link.path}
					key={idx}
					className={cn(
						"justify-left flex h-[50px] w-full items-center text-center text-2xl text-slate-500 hover:text-white",
					)}
					// @ts-ignore
					activeClassName="active" // Apply active class when NavLink is active
				>
					<div className="flex gap-3 px-3">
						<div>{link.icon}</div>
						<p className="text-sm">{link.name}</p>
					</div>
				</NavLink>
			))}
		</div>
	);
}
