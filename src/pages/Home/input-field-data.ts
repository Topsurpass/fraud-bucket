import { z } from "zod";
import { InputTpyes } from "@/types/form-types";

export const inputFields: InputTpyes[] = [
  {
    name: "Email",
    label: "Email",
    placeholder: "examle@gmail.com",
    type: "email",
    description: "",
    validationSchema: z.string().email({
      message: "Please enter a valid email address.",
    }),
    errorMessage: "Please enter a valid email address",
  },
  {
    name: "Password",
    label: "Password",
    placeholder: "",
    description: "",
    type: "password",
    validationSchema: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    errorMessage: "Password must be at least 8 characters.",
  },
];
