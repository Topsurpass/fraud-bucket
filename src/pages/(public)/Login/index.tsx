import { DynamicForm } from "@/components/features/Form";
import { inputFields } from "@/pages/(public)/Login/input-field-data";
import Button from "@/components/ui/Buttons";
import Logo from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
	const navigate = useNavigate();


	function handleSubmit(data: Record<string, any>) {
		alert(`Welcome ${data.Email}`);
		navigate('/dashboard')
	}
	return (
		<section className="flex  w-full  flex-col items-center justify-center bg-gradient-to-br from-etzBlue-800 via-black to-etzBlue-500 md:flex-row md:justify-evenly">
			<div className=" hidden text-white md:flex md:flex-col">
				<Logo
					redSize="text-4xl"
					blueSize="text-4xl"
					logoSize="-mt-3 text-5xl"
				/>

				<h3 className="text-xl">Welcome to FraudBucket Admin Portal</h3>
				<p className="mt-5 text-xs">
					This system remains the property of eTranzact Ltd. All
					Rights Reserved.
				</p>
			</div>
			<div className="flex h-[400px] flex-col items-center justify-center gap-5 md:w-[300px] ">
				<div className="w-full text-center">
					<h1 className="text-xl font-bold text-white">Sign in</h1>
					<p className="text-xs text-white">
						Enter Email Address/Username and Password to login
					</p>
				</div>
				<div className="w-full">
					<DynamicForm
						inputs={inputFields}
						onSubmit={handleSubmit}
						children={
							<Button
								variant="primary"
								type="submit"
								title="Submit"
								size="lg"
								fullWidth
								className="rounded"
								isLoading={false}
								loadingText="Please wait..."
							/>
						}
					/>
				</div>
			</div>
		</section>
	);
}
