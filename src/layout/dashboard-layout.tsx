import Header from "@/components/features/Header";
import { Outlet } from "react-router-dom";
import SideMenu from "@/components/features/SideMenu";

export default function DashboardLayout() {
	return (
		<div className="flex w-full">
			<header className="fixed left-0 top-0 z-10 w-full bg-gray-100">
				<div className="flex h-[100px] items-center border px-5 md:px-10">
					<Header />
				</div>
			</header>
			<div className="mt-[100px] flex md:flex-1 w-full">
				<SideMenu/>
				<div className="ml-0 flex-1 p-5 md:ml-[300px] md:w-full justify-center items-center flex-col">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
