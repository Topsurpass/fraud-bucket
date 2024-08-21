import Header from "@/components/features/Header";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils";
import React, { useState } from "react";

import SideMenu from "@/components/features/SideMenu";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { navLinks } from "@/data/menu-data";


// export default function DashboardLayout() {
// 	return (
// 		<div className="">
// 			<header className="fixed left-0 top-0 z-10 w-full bg-gray-100">
// 				<div className="flex h-[100px] items-center border px-5 md:px-10">
// 					<Header />
// 				</div>
// 			</header>
// 			<div className="mt-[100px] flex  md:flex-1 w-full ">
// 				<aside className="w-0 md:bottom-0 md:top-[100px] md:z-10 hidden bg-gray-100 md:pt-3 md:fixed md:block md:w-[300px]">
// 					<SideMenu />
// 				</aside>
// 				<div className="ml-0 flex-1 p-5 md:ml-[300px]">
// 					<Outlet />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default function DashboardLayout() { 
// 	return (
// 		<div className="flex h-auto flex-col bg-green-500">
// 			<div className="flex h-[100px] items-center border bg-white px-5 md:px-10">
// 				<Header />
// 			</div>
// 			<div className="grid h-auto w-full grid-cols-1 bg-red-500 md:grid md:h-[calc(100vh-100px)] md:w-[800px] md:grid-cols-6">
// 				<aside className="hidden w-0 bg-gray-100 md:fixed md:bottom-0 md:top-[100px] md:z-10 md:block md:w-[300px] md:pt-3">
// 					<SideMenu />
// 				</aside>
// 				<main className="fixed md:col-span-4">
// 					<Outlet />
// 				</main>
// 			</div>
// 		</div>
// 	);
// }

// export default function DashboardLayout() {
// 	return (
// 		<div className="flex h-screen flex-col">
// 			<Header />
// 			<div className="mt-[70px] flex h-full w-full flex-col md:flex-row">
// 				{/* Sidebar */}
// 				<div className="fixed left-0 top-[70px] z-20 h-screen w-full bg-red-500 md:relative md:left-0 md:top-0 md:w-[30%]">
// 					{navLinks.map((link, idx) => (
// 						<NavLink
// 							to={link.path}
// 							key={idx}
// 							className={({ isActive }) =>
// 								cn(
// 									"flex h-[50px] w-full items-center rounded-md text-2xl text-black hover:text-etzBlue-500",
// 									{ "bg-white hover:text-black": isActive },
// 								)
// 							}
// 						>
// 							<div className="flex gap-3 px-3">
// 								<div>{link.icon}</div>
// 								<p className="text-sm">{link.name}</p>
// 							</div>
// 						</NavLink>
// 					))}
// 				</div>
// 				{/* Main Content */}
// 				<div className="mt-16 h-full flex-1 overflow-y-auto bg-blue-500 p-4 md:ml-[30%]">
// 					<Outlet />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export default function DashboardLayout() {
	return (
		<div className="">
			<header className="fixed left-0 top-0 z-10 w-full bg-gray-100">
				<div className="flex h-[100px] items-center border px-5 md:px-10">
					<Header />
				</div>
			</header>
			<div className="mt-[100px] flex md:flex-1 w-full ">
				<aside className="hidden w-0 md:bottom-0 md:top-[100px] md:z-10  bg-gray-100 md:pt-3 md:fixed md:block md:w-[300px]">
					{navLinks.map((link, idx) => (
						<NavLink
							to={link.path}
							key={idx}
							className={({ isActive }) =>
								cn(
									"flex h-[50px] w-full items-center rounded-md text-2xl text-black hover:text-etzBlue-500",
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
				<div className="ml-0 flex-1 p-5 md:ml-[300px] ">
					<Outlet />
				</div>
			</div>
		</div>
	);
}