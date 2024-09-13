import { z } from "zod";
import { SelectSchema } from "./schema";
import validator from "validator";

export const CreateContactSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	merchant: SelectSchema,
	phone: z
		.string()
		.min(1, { message: "Phone number is required" })
		.refine((value) => validator.isMobilePhone(value), {
			message: "Invalid phone number",
		}),
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email address" }),
});

export type CreateContactInputs = z.infer<typeof CreateContactSchema>;
