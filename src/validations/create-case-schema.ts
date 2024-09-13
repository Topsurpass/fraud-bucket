import { z } from "zod";
import { SelectSchema } from "./schema";

export const CreateCaseSchema = z.object({
	merchant: SelectSchema,
	amount: z.string().min(1, { message: "Amount is required" }),
	channel: SelectSchema,
	method: SelectSchema,
	analyst: SelectSchema,
	status: SelectSchema,
});

export type CreateCaseInputs = z.infer<typeof CreateCaseSchema>;
