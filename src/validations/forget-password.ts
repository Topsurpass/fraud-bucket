import { z } from "zod";
import { emailSchema, passwordSchema } from "./schema";

export const resetPassword = z
  .object({
    passcode: z.string().min(1, { message: "Passcode cannot be empty" }),
    newPassword: passwordSchema,
    verifyPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "Passwords do not match",
  });

export const emailOnlySchema = z.object({
  email: emailSchema,
});

export const emailAndPasswordSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInputs = z.infer<typeof emailAndPasswordSchema>;
export type ForgetPasswordInput = z.infer<typeof emailOnlySchema>;
export type ResetPasswordInputs = z.infer<typeof resetPassword>;
