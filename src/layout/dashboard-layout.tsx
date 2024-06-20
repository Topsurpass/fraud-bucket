import Header from "@/components/features/Header";
import { Outlet } from "react-router-dom";
import SideMenu from "@/components/features/SideMenu";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout() {
	return (
		<section className="overflow-hidden ">
			<div className="fixed top-0 z-50 flex h-[65px] w-full items-center bg-etzBlue-800 pl-3 pr-5 text-white">
				<Header />
			</div>
			<div className="mt-[65px] flex h-screen w-full overflow-y-hidden overflow-x-scroll">
				<ScrollArea className="left-0 hidden h-screen bg-etzBlue-800 p-0 text-white md:fixed md:flex md:w-[270px]">
					<SideMenu />
				</ScrollArea>
				<ScrollArea className="fixed h-screen w-full bg-gray-100 p-3">
					<Outlet />
				</ScrollArea>
			</div>
		</section>
	);
}
