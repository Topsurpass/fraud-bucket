import { Link } from "react-router-dom";
import Logo from "@/components/ui/logo";

export default function WelcomePage() {
	return (
		<div className="from-bg-etzBlue-800 to-bg-etzBlue-500 flex h-screen flex-col items-center justify-center bg-gradient-to-br from-etzBlue-800 via-black to-etzBlue-500 text-white">
			<div className="flex w-full items-center justify-center flex-wrap">
				<h1 className="font-montserrat mb-6 md:text-5xl text-2xl">Welcome to</h1>
				<div className="-mt-5 md:mt-0">
					<Logo
						redSize="md:text-4xl md:-mt-3 ml-1 text-2xl -mt-1"
						blueSize="md:text-4xl md:-mt-3 text-2xl -mt-1"
						logoSize="md:-mt-6 md:text-5xl text-xl -mt-1"
					/>
				</div>
			</div>

			<p className="text-xxl mb-12 text-center">
				Your ultimate fraud storage solution
			</p>
			<Link
				to="/login"
				className="rounded-md border bg-red-500 px-3 py-1  text-white hover:bg-red-700"
			>
				Go to Login
			</Link>
		</div>
	);
}
