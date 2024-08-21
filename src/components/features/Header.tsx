import Logo from "@/components/ui/logo";
import { IoMoonSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLogout } from "react-icons/md";
import MobileMenu from "@/components/features/Mobile-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Links, dayAndNight } from "@/data/menu-data";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/utils";
import useAuthStore from "@/stores/user-store";

type ProfileProps = {
	triggerIcon: ReactNode;
	contentDivs: ReactNode;
	contentClass?: string;
};

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const userStore = useAuthStore((state) => state);
	const handleLogout = () => {
		userStore.reset();
	};

	return (
		<header className="flex w-full flex-col">
			<div className="flex w-full items-center justify-between">
				<div className="cursor-pointer">
					<Logo
						redSize="md:text-2xl text-xl"
						blueSize="md:text-2xl text-xl"
						logoSize="md:text-2xl -mt-1 text-black"
					/>
				</div>
				<div className="hidden md:flex md:items-center md:gap-5">
					<ProfileCard
						triggerIcon={
							<IoMoonSharp className="cursor-pointer text-gray-100" />
						}
						contentDivs={
							<div className="mr-30 flex flex-col gap-3">
								{dayAndNight.map((row, idx) => (
									<div
										key={idx}
										className="flex h-[30px] cursor-pointer items-center gap-3 px-2 hover:w-full hover:rounded hover:bg-etzBlue-500"
									>
										{row.icon}
										{row.label}
									</div>
								))}
							</div>
						}
						contentClass="mr-20 mt-5  w-[120px]"
					/>
					<ProfileCard
						triggerIcon={
							<Avatar className="cursor-pointer">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback
									delayMs={600}
									className="text-black"
								>
									OT
								</AvatarFallback>
							</Avatar>
						}
						contentDivs={
							<>
								<div className="flex items-center gap-3">
									<img
										src="https://github.com/shadcn.png"
										className="w-[40px] rounded-full"
									/>
									<div>
										<p>{userStore.name}</p>
										<p className="text-[12px]">
											{userStore.job}
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-4">
									{Links.map((link, idx) => (
										<Link
											to={link.href}
											key={idx}
											className="hover:text-etzBlue-500"
										>
											{link.label}
										</Link>
									))}
								</div>
								<button
									className="flex w-full items-center gap-3 hover:text-etzBlue-500"
									onClick={handleLogout}
								>
									<MdLogout className="text-xl" /> Logout
								</button>
							</>
						}
						contentClass="mr-5 mt-2"
					/>
				</div>
				<div className="flex cursor-pointer items-center text-2xl md:hidden">
					{isOpen ? (
						<AiOutlineClose onClick={() => setIsOpen(!isOpen)} />
					) : (
						<AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />
					)}
				</div>
			</div>
			<div
				className={`${isOpen ? "w-[50%] translate-x-0 transform duration-300 ease-out" : "w-0 translate-x-full transform duration-300 ease-in"} fixed right-0 mt-[46px] flex h-screen flex-col bg-etzBlue-800 text-white md:hidden`}
			>
				<ScrollArea className="h-[80%]">
					<MobileMenu />
				</ScrollArea>
			</div>
		</header>
	);
}

export function ProfileCard({
	triggerIcon,
	contentDivs,
	contentClass,
}: ProfileProps) {
	return (
		<HoverCard openDelay={10}>
			<HoverCardTrigger>{triggerIcon}</HoverCardTrigger>
			<HoverCardContent
				className={cn(
					`${contentClass} flex flex-col gap-6 bg-gray-100 text-sm `,
				)}
			>
				{contentDivs}
			</HoverCardContent>
		</HoverCard>
	);
}
