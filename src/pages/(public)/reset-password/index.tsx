import { Mail } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useMutateResetPass from "@/api/password/use-mutate-reset";
import { PasswordField } from "@/components/ui/forms";
import {
	ResetPasswordInputs,
	resetPassword,
} from "@/validations/forget-password";
import SuccessAlert from "@/components/ui/alert-dialog/success-alert";

export default function ResetPassword() {
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showVerifyPassword, setShowVerifyPassword] = useState(false);
	const { mutate: mutateResetPass, isPending } = useMutateResetPass();
	const navigate = useNavigate();
	const { passcode } = useParams<{ passcode?: string }>();
	const { control, handleSubmit, reset } = useForm<ResetPasswordInputs>({
		resolver: zodResolver(resetPassword),
		defaultValues: {
			passcode,
			newPassword: "",
			verifyPassword: "",
		},
	});

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleShowVerifyPassword = () => {
		setShowVerifyPassword(!showVerifyPassword);
	};

	const processForm: SubmitHandler<ResetPasswordInputs> = async (data) => {
		const { verifyPassword, ...payload } = data;
		const requestPayload = {
			passcode: payload.passcode,
			password: payload.newPassword,
		}
		mutateResetPass(requestPayload, {
			onSuccess: (res) => {
				toast.success(res?.data?.message);
				reset();
				setOpen(true);
			},
			onError: (err: any) => {
				toast.error(err.response.data.error);
			},
		});
	};

	const handleAlertClose = () => {
		setOpen(false);
		navigate("/login");
	};
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-100/50">
			<form className="m-auto w-full p-4 sm:max-w-lg">
				<div className="mb-3 flex flex-col items-center justify-center">
					<div className="flex items-center justify-center">
						<Logo
							redSize="text-3xl"
							blueSize="text-3xl"
							logoSize="-mt-2 text-3xl text-black"
						/>
					</div>
				</div>
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-center text-2xl font-semibold text-gray-500">
							Reset Password
						</CardTitle>
						<CardDescription className="text-center">
							Enter your new password
						</CardDescription>
					</CardHeader>
					<CardContent className="flex w-[100%] flex-col items-center justify-center gap-5 rounded-md bg-white p-5">
						<div className="w-full">
							<PasswordField
								label="New Password"
								name="newPassword"
								control={control}
								icon={<Mail size={18} />}
								showPassword={showPassword}
								onIconClick={() => handleShowPassword()}
								type={showPassword ? "text" : "password"}
								className="w-full rounded-md border py-3 pl-8"
							/>
						</div>
						<div className="w-full">
							<PasswordField
								label="Re-Enter Password"
								name="verifyPassword"
								control={control}
								icon={<Mail size={18} />}
								showPassword={showVerifyPassword}
								onIconClick={() => handleShowVerifyPassword()}
								type={showVerifyPassword ? "text" : "password"}
								className="w-full rounded-md border py-3 pl-8"
							/>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col space-y-4">
						<Button
							className="w-full"
							type="button"
							onClick={handleSubmit(processForm)}
							label="Submit New Password"
							isLoading={isPending}
						/>
					</CardFooter>
				</Card>
			</form>
			<SuccessAlert
				title="Password Reset Successfully"
				description="Your new password has been created"
				open={open}
				confirmText="Login"
				onConfirm={handleAlertClose}
			/>
		</div>
	);
}
