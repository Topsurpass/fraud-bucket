import { z } from "zod";
import validator from "validator";
import { startCase } from "lodash";

export const emailSchema = z
	.string()
	.min(1, { message: "Email address is required" })
	.email({ message: "Please enter a valid email" });

export const phoneSchema = z.string().refine(validator.isMobilePhone, {
	message: "Invalid phone number",
});

export const SelectSchema = z
	.object({
		label: z.string().optional(),
		value: z.string().optional(),
	})
	.refine(
		(data) => {
			const isEmpty = Object.values(data).length > 0;
			return isEmpty;
		},
		{
			message: "Please select an option",
		},
	)
	.default({});

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	if (issue.code === z.ZodIssueCode.invalid_type) {
		if (issue.expected === "object") {
			return { message: "Please select an option" };
		}
		if (issue.expected === "string") {
			if (typeof issue.path === "string") {
				return { message: `${startCase(issue.path)} is required` };
			}
		}
	}

	return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
