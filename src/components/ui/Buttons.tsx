import { cva } from "class-variance-authority";
import cn from "@/utils/tailwind-merge";
import { SpinnerCircular } from "spinners-react";


const buttonVariants = cva("text-base", {
  variants: {
    variant: {
      primary: "bg-green-500 text-white",
      secondary: "bg-red-500 text-white",
      cancel: "bg-gray-500",
    },
    size: {
      sm: "px-2 py-2",
      md: "px-4 py-2",
      lg: "px-6 py-3",
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


type ButtonProps = {
    variant: "primary" | "secondary" | "cancel",
    size: "sm" | "md" | "lg",
    className?: string,
    title: string,
    fullWidth?: boolean,
    disabled?: boolean,
    isLoading?: boolean,
    loadingText?: string
}

export default function Button({
  variant,
  size,
  className,
  title,
  fullWidth,
  disabled,
  isLoading,
  loadingText,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
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
          size={28}
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
