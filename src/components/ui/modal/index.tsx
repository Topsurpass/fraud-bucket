import React, { Fragment, useCallback } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "../button";

const panelVariants = cva(
  `w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all`,
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        xlarge: "max-w-5xl",
        full: "max-w-7xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
const titleVariants = cva(`flex items-center px-6 py-3`, {
  variants: {
    bgTitle: {
      default: "font-medium",
      primary: "bg-green-100 text-green-600 font-bold",
      secondary: "bg-red-100",
    },
  },
  defaultVariants: {
    bgTitle: "default",
  },
});

interface IModal {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  backdrop?: boolean;
  showCloseButton?: boolean;
  setIcon?: React.ReactNode;
}

export interface IProps
  extends IModal,
    VariantProps<typeof panelVariants>,
    VariantProps<typeof titleVariants> {}

export default function Modal({
	showCloseButton = true,
	setIcon,
	title = "",
	description = "",
	className = "",
	headerClass = "",
	titleClass = "",
	descriptionClass = "",
	size,
	backdrop = false,
	open,
	handleClose,
	children,
}: IProps) {
	const hasBackdrop = useCallback(() => {
		if (backdrop) {
			handleClose();
			return false;
		}
		return false;
	}, [backdrop, handleClose]);

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-[50]" onClose={hasBackdrop}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					{/* bg-opacity controls the background backdrop density/opacity */}
					<div
						className={cn(
							"fixed inset-0 bg-black/80 bg-opacity-70",
						)}
					/>
				</TransitionChild>
				<div className="fixed inset-0 overflow-y-auto">
					{/* items-start, items-center controls the position of the modal */}
					<div className="flex min-h-full items-center justify-center px-10 py-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							{/*  max-w-md, controls the width size */}
							<DialogPanel
								className={cn(
									"bg-background text-foreground",
									panelVariants({
										size,
									}),
									className,
								)}
							>
								<section>
									<header
										className={cn(
											"mb-3 flex justify-between px-4 pt-4",
											headerClass,
										)}
									>
										<div className="flex flex-col items-center justify-center">
											{title && (
												<DialogTitle
													className={cn(
														"flex items-center gap-2 text-xl font-medium",
														titleClass,
													)}
												>
													{setIcon}
													{title}
												</DialogTitle>
											)}
											{description && (
												<Description
													className={cn(
														"text-sm text-gray-500",
														descriptionClass,
													)}
												>
													{description}
												</Description>
											)}
										</div>
										{showCloseButton && (
											<Button
												type="button"
												aria-label="close"
												onClick={handleClose}
												className="rounded-full border border-gray-300"
												variant="outline"
												size="icon"
											>
												<X
													size={20}
													className="cursor-pointer"
												/>
											</Button>
										)}
									</header>
									{/* <div className="scrollbar-thin scrollbar-thumb-blue-500 custom-max-height px-2 py-5"> */}
									{children}
								</section>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
