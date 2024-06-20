import { cn } from "@/utils";
import {
	Card,
	CardContent,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function CardCompo({ className, children, ...props }: CardProps) {
	return (
		<Card
			className={cn(
				"flex flex-col items-center justify-center bg-etzBlue-800 text-white",
				className,
			)}
			{...props}
		>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	);
}
