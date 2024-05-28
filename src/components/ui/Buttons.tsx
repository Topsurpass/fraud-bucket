import { cva } from "class-variance-authority";
import { cn } from "@/utils";
import { SpinnerCircular } from "spinners-react";
import { ButtonProps } from "@/types/form-types";


const buttonVariants = cva("text-base", {
  variants: {
    variant: {
      primary: "bg-green-500 text-white",
      secondary: "bg-red-500 text-white",
      cancel: "bg-gray-500",
    },
    size: {
      sm: "px-2 py-2 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-sm",
    },
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "bg-gray-100 cursor-not-allowed",
    },
    loading: {
      true: "relative text-center",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "sm",
      class: "rounded-md",
    },
  ],
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
    disabled: false,
    size: "sm",
    loading: false,
  },
});

export default function Button({
  variant,
  size,
  type,
  className,
  title,
  fullWidth,
  disabled,
  isLoading,
  loadingText,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('flex justify-center items-center',
        buttonVariants({
          variant,
          size,
          className,
          fullWidth,
          disabled,
          loading: isLoading,
        })
      )}
    >
      {isLoading && (
        <SpinnerCircular
          size={15}
          thickness={140}
          speed={180}
          color="white"
          secondaryColor="rgba(0, 0, 0, 0.44)"
          className="mr-2"
        />
      )}
      {isLoading ? loadingText : title}
    </button>
  );
}
