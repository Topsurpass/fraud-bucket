import { z } from "zod";
import { SelectSchema } from "./schema";
import validator from "validator";

export const CreateTxnSchema = z.object({
	merchant: SelectSchema,
	amount: z
		.string()
		.min(1, { message: "Amount is required" })
		.refine((value) => validator.isNumeric(value), {
			message: "Amount must be a valid number",
		}),
	type: SelectSchema,
	analyst: SelectSchema,
	channel: SelectSchema,
	status: SelectSchema,
});

export type CreateTxnInputs = z.infer<typeof CreateTxnSchema>;
