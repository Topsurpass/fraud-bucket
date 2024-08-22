import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogCancel,
  //   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import SuccessIcon from "@/assets/icons/success-icon";

interface ISuccessAlert {
  title: string;
  description: string;
  confirmText?: string;
  open: boolean;
  onConfirm?: () => void;
}

export default function SuccessAlert({
  title,
  description,
  confirmText = "continue",
  open,
  onConfirm,
}: ISuccessAlert) {
  return (
    <div>
      <AlertDialog open={open} onOpenChange={onConfirm}>
        <AlertDialogContent className="flex flex-col items-center justify-center">
          <svg
            width="68"
            height="68"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="#2563eb"
              stroke="#E9F3FA"
              strokeWidth="20"
            />
            <rect
              width="30.7692"
              height="30.7692"
              transform="translate(44.6152 44.6155)"
              fill="#2563eb"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M71.2576 51.6278C71.6331 52.0033 71.6331 52.6121 71.2576 52.9876L57.796 66.4492C57.6157 66.6295 57.3712 66.7308 57.1161 66.7308C56.8611 66.7308 56.6165 66.6295 56.4362 66.4492L49.7055 59.7184C49.33 59.3429 49.33 58.7341 49.7055 58.3586C50.081 57.9831 50.6898 57.9831 51.0653 58.3586L57.1161 64.4094L69.8978 51.6278C70.2733 51.2523 70.8821 51.2523 71.2576 51.6278Z"
              fill="white"
            />
          </svg>
          <AlertDialogHeader className="">
            <AlertDialogTitle className="text-center text-xl">{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
            <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
