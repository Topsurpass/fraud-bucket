import { z } from "zod";
import validator from "validator";
import { SelectSchema } from "./schema";


export const SettingUserSchema = (isEdit: boolean) =>
	z.object({
		firstname: z.string().min(1, { message: "Firstname is required" }),
		lastname: z.string().min(1, { message: "LastName is required" }),
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
		jobTitle: z.string().min(1, { message: "Job title is required" }),
		password: isEdit
			? z.string().optional()
			: z.string().min(6, {
					message: "Password must be at least 6 characters",
				}),
		role: SelectSchema,
	});

export type SettingUserInputs = z.infer<ReturnType<typeof SettingUserSchema>>;
