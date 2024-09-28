import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, CircleUserRound, AlertCircle } from "lucide-react";
import useLoginUser from "@/api/authentication/useLoginUser";
import Logo from "@/components/ui/logo";
import { LoginInputs } from "@/validations/login-schema";
import { LoginSchema } from "@/validations/login-schema";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PasswordField, TextField } from "@/components/ui/forms";

export default function HomePage() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const { mutate: loginUser, isPending, isError, error } = useLoginUser();

	const { control, handleSubmit } = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "admin@fraud.com",
			password: "Adminfraud",
		},
	});

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const processForm: SubmitHandler<LoginInputs> = async (data) => {
		loginUser(data);
	};

	return (
		<section className="grid h-screen w-full grid-cols-1 bg-slate-50 px-5 md:grid-cols-2 fixed">
			<div className="flex flex-col items-center justify-end md:justify-center text-white md:flex-col">
				<Logo
					redSize="text-4xl"
					blueSize="text-4xl"
					logoSize="-mt-5 text-5xl text-black"
				/>
				<h3 className="text-wrap text-center text-xl text-black">
					Welcome to FraudBucket Admin Portal
				</h3>
				<p className="mt-5 hidden text-xs text-black md:block">
					This system remains the property of eTranzact Ltd. All
					Rights Reserved.
				</p>
			</div>
			{/* <form> */}
			<Card className="m-auto flex flex-col md:h-[500px] md:w-[450px]">
				<CardHeader className="space-y-1">
					{/* TODO: extract below to a reusable component */}
					<div className="flex justify-center">
						<div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white">
								<CircleUserRound size={18} color="black" />
							</div>
						</div>
					</div>
					<CardTitle className="text-center text-2xl font-medium text-gray-700">
						Login to your account
					</CardTitle>
					<CardDescription className="text-center text-lg">
						Enter your email and password to login
					</CardDescription>
				</CardHeader>
				<CardContent className="flex w-[100%] flex-col items-center justify-center gap-5 rounded-md bg-white p-5">
					<div className="w-full">
						<TextField
							label="Email"
							name="email"
							control={control}
							icon={<Mail size={18} />}
							iconPosition="left"
							placeholder="Enter your email address"
							className="w-full rounded-md border py-3 pl-8"
						/>
					</div>
					<div className="w-full">
						<PasswordField
							label="Password"
							name="password"
							control={control}
							showPassword={showPassword}
							placeholder="Enter your password"
							onIconClick={() => handleShowPassword()}
							type={showPassword ? "text" : "password"}
							showLeftIcon={false}
							className="w-full rounded-md border py-3 px-2"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center space-x-2">
							<input type="checkbox" />
							<span>Remember me</span>
						</div>
						<Button
							type="button"
							onClick={() => navigate("/forgot-password")}
							variant="link"
							className="text-gray-700"
						>
							Forget Password?
						</Button>
					</div>
					<Button
						className="w-full"
						type="submit"
						label="Sign In"
						onClick={handleSubmit(processForm)}
						isLoading={isPending}
						loadingText="Please wait"
						disabled={isPending}
					/>
				</CardFooter>
				{isError && (
					<div className="mt-2 flex items-center justify-center gap-2">
						<AlertCircle size={20} color="red" />
						<span className="text-red-500">
							{error?.response?.data?.error as any}
						</span>
					</div>
				)}
			</Card>
			{/* </form> */}
		</section>
	);
}
