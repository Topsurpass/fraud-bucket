import { GiEmptyWoodBucketHandle } from "react-icons/gi";
import { cn } from "@/utils";

type LogoProps = {
	redSize: string;
    blueSize: string;
    logoSize: string;
};

export default function Logo({ redSize, blueSize, logoSize }: LogoProps) {
	return (
		<div className="flex items-center">
			<span className={cn(`${redSize} text-red-500`)}>Fraud</span>
			<span className={cn(`${blueSize} text-blue-500`)}>Bucket</span>
			<GiEmptyWoodBucketHandle className={cn(`${logoSize}`)} />
		</div>
	);
}
