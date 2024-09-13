/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/utils";
import LoadingSpinner from "@/assets/icons/loading-spinner";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary: "bg-blue-500 text-white hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				danger:"bg-red-500 text-white",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				md: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
			fullWidth: {
				true: "w-full",
			},
			disabled: {
				true: "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	label?: string;
	isLoading?: boolean;
	disabled?: boolean;
	loadingText?: string;
	children?: React.ReactNode;
	icon?: any;
	iconPosition?: "start" | "end";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			label = "",
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			disabled = false,
			fullWidth,
			loadingText = "Please wait",
			icon,
			iconPosition = "start",
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const Icon = icon;
		const render = () => {
			if (children) return children;
			if (isLoading) {
				return (
					<div className="flex items-center gap-2">
						<LoadingSpinner className="text-blue-brand" />
						<div className="flex items-center">
							<span className="capitalize">{loadingText}</span>
							<MoreHorizontal
								size={25}
								className="animate-pulse"
							/>
						</div>
					</div>
				);
			}
			return (
				<div className="flex items-center gap-2">
					{icon && (
						<Icon
							size={18}
							className={cn(
								iconPosition === "start"
									? "order-0"
									: "order-1",
							)}
						/>
					)}
					<span>{label}</span>
				</div>
			);
		};
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, disabled, fullWidth }),
					className,
				)}
				ref={ref}
				disabled={disabled}
				{...props}
			>
				{render()}
			</Comp>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;