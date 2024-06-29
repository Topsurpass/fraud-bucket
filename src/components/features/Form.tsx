import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputTpyes } from "@/types/form-types";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form";
import { ReactNode } from "react";

type DynamicFormProps = {
	inputs: InputTpyes[];
	onSubmit: (data: Record<string, any>) => void;
	children: ReactNode;
};

export function DynamicForm({ inputs, onSubmit, children }: DynamicFormProps) {
	// Type all inputs in an array of objects
	const formSchema = z.object(
		Object.fromEntries(
			inputs.map((input) => [input.name, input.validationSchema]),
		),
	);

	//Give all inputs a default value
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: Object.fromEntries(
			inputs.map((input) => [input.name, ""]),
		),
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-3 text-white"
			>
				{inputs.map((input, idx) => (
					<FormField
						key={idx}
						control={form.control}
						name={input.name}
						// @ts-ignore
						render={({ field }) => (
							<FormItem>
								<FormLabel>{input.label}</FormLabel>
								<FormControl>
									<Input
										placeholder={input.placeholder}
										{...field}
										type={input.type}
										className="text-black"
									/>
								</FormControl>
								<FormDescription className="text-white">
									{input.description}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				{children}
			</form>
		</Form>
	);
}
