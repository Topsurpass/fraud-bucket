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
    variant: "primary" | "secondary" | "cancel",
    size: "sm" | "md" | "lg",
    type: "submit" | "button" | "reset",
    className?: string,
    title: string,
    fullWidth?: boolean,
    disabled?: boolean,
    isLoading?: boolean,
    loadingText?: string
}

export type FormDataProps = {
  username: string;
  password: string;
}