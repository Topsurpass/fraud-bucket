import Header from "@/components/features/Header";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { navLinks } from "@/data/menu-data";
import { cn } from "@/utils";

export default function DashboardLayout() {
	return (
		<div className="flex h-screen w-full flex-col">
			<header className="fixed left-0 top-0 z-10 w-full bg-gray-100">
				<div className="flex h-[65px] items-center border px-5 md:px-10">
					<Header />
				</div>
			</header>
			<div className="flex flex-1 pt-[65px]">
				<aside className="hidden duration-300 md:fixed md:left-0 md:top-[65px] md:z-10 md:block md:h-[calc(100vh-65px)] md:w-64 p-3 md:translate-x-0 md:overflow-y-auto md:bg-gray-100 md:shadow-lg md:transition-transform">
					{navLinks.map((link, idx) => (
						<NavLink
							to={link.path}
							key={idx}
							className={({ isActive }) =>
								cn(
									"flex h-[50px] w-full items-center rounded-md px-4 py-[30px] text-gray-500  hover:text-etzBlue-500 font-semibold text-2xl",
									{ "bg-white hover:text-black": isActive },
								)
							}
						>
							<div className="flex gap-3">
								<div>{link.icon}</div>
								<p className="text-sm">{link.name}</p>
							</div>
						</NavLink>
					))}
				</aside>
				<div className="ml-0 p-5 md:fixed md:ml-64 md:h-[calc(100vh-65px)] md:w-[calc(100vw-256px)] md:overflow-y-auto w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
