import Logo from "@/components/ui/logo";
import { IoMoonSharp } from "react-icons/io5";
import { TfiUser } from "react-icons/tfi";

export default function Header() {
    return (
		<header className="flex w-full items-center justify-between">
			<div className="cursor-pointer">
				<Logo
					redSize="text-2xl"
					blueSize="text-2xl"
					logoSize="text-2xl -mt-1"
				/>
			</div>
			<div className="flex items-center gap-5">
				<IoMoonSharp className="cursor-pointer text-gray-100 " />
				<div className="cursor-pointer rounded border p-2">
					<TfiUser className="" />
				</div>
			</div>
		</header>
	);
}
