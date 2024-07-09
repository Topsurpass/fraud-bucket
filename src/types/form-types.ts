import { z } from "zod";

export type InputTpyes = {
	name: string;
	label: string;
	type: string;
	placeholder: string;
	description: string;
	validationSchema: z.ZodType<any>;
	errorMessage: string;
};

export type ButtonProps = {
	variant: "primary" | "secondary" | "cancel";
	size: "sm" | "md" | "lg";
	type: "submit" | "button" | "reset";
	className?: string;
	title: string;
	fullWidth?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
	loadingText?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	icon?: React.ReactNode;
};

export type FormDataProps = {
	username: string;
	password: string;
};

export type AnalystProps = {
	name: string;
	fraudCount: number;
	title: string;
};

export type BankProps = {
	name: string;
	fraudCount: number;
	amount: number;
};

export type TransactionProps =  {
	name: string;
	merchant: string;
	date: string; 
	amount: number;
}