import { Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import useMutateReqPass from "@/api/password/use-mutate-request";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TextField } from "@/components/ui/forms";
import {
	ForgetPasswordInput,
	emailOnlySchema,
} from "@/validations/forget-password";
import Logo from "@/components/ui/logo";

export default function ForgotPassword() {
	const { mutate: mutateReqPass, isPending } = useMutateReqPass();

	const { control, handleSubmit, reset } = useForm<ForgetPasswordInput>({
		resolver: zodResolver(emailOnlySchema),
		defaultValues: {
			email: "",
		},
	});

	const processForm: SubmitHandler<ForgetPasswordInput> = async (data) => {
		mutateReqPass(data, {
			onSuccess: (res) => {
				toast.success(res?.data?.message);
				reset();
			},
			onError: (err: any) => {
				toast.error(err.response.data.error);
			},
		});
	};

	return (
		<div className="grid h-screen w-full grid-cols-1 bg-slate-50 px-5 fixed">
			<form
				className="m-auto w-full p-4 sm:max-w-lg"
				onSubmit={handleSubmit(processForm)}
			>
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
							Forgot Your Password
						</CardTitle>
						<CardDescription className="text-center">
							Enter your email and we will send you a link to
							reset your password
						</CardDescription>
					</CardHeader>
					<CardContent className="flex w-[100%] flex-col items-center justify-center gap-5 rounded-md bg-white p-5">
						<div className="w-full">
							<TextField
								label="Email"
								name="email"
								type="email"
								control={control}
								placeholder="johndoe@gmail.com"
								icon={<Mail size={18} />}
								iconPosition="left"
								className="w-full rounded-md border py-3 pl-8"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button
							className="w-full"
							type="submit"
							onClick={handleSubmit(processForm)}
							label="Send Email"
							isLoading={isPending}
						/>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
