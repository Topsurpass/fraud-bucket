import { cn } from "@/utils";

const outerStyles = {
	base: "flex items-center justify-center rounded-full border border-gray-200 bg-gray-50",
	size: {
		md: "h-14 w-14",
	},
};

const innerStyles = {
	base: "flex items-center justify-center rounded-full border border-gray-200 bg-white",
	size: {
		md: "h-9 w-9 ",
	},
};

interface IDisplayIcon {
	icon: any;
	size?: keyof typeof innerStyles.size;
}

export default function DisplayIcon({ icon, size = "md" }: IDisplayIcon) {
	return (
		<div className={cn(outerStyles.base, outerStyles.size[size])}>
			{/* <div className={cn(innerStyles.base, innerStyles.size[size])}> */}
				{/* <CircleUserRound size={18} color="black" /> */}
				{icon}
			{/* </div> */}
		</div>
	);
}
