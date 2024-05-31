import { ReactNode } from "react";
import Header from "@/components/features/Header";
import SideMenu from "@/components/features/SideMenu";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<section>
			<div className="fixed top-0 z-50 flex h-[65px] w-full items-center bg-etzBlue-800 pl-2 pr-5 text-white">
				<Header />
			</div>
			<div className="mt-[65px] flex h-screen w-full border border-red-500">
				<ScrollArea className="left-0 -ml-[1px] -mt-[1px] hidden h-screen overflow-y-hidden bg-etzBlue-800 p-0 text-white md:fixed md:flex md:w-[230px]">
					<SideMenu />
				</ScrollArea>
				<div className="fixed top-[65px] h-screen w-full bg-gray-100 p-5 md:left-[230px]">
					{children}
				</div>
			</div>
		</section>
	);
}
