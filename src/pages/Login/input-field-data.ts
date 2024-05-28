import { z } from "zod";
import { InputTpyes } from "@/types/form-types";


export const inputFields: InputTpyes[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "username",
      type: "text",
      description: "e.g Temz98",
      validationSchema: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      errorMessage: "Username must be at least 2 characters.",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "example@example.com",
      description: "email will be verified",
      type: "email",
      validationSchema: z.string().email({
        message: "Please enter a valid email address.",
      }),
      errorMessage: "Please enter a valid email address.",
    },
  ];
