import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

type RouteError = {
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
		<div className="flex h-screen flex-col items-center justify-center bg-gradient-to-tl from-bg-etzBlue-800  via-black to-bg-etzBlue-500 text-red-500 ">
			<h1 className="font-montserrat text-3xl ">Oops!</h1>
			<p>
				<p>{`Page ${error.statusText.toLocaleLowerCase()}`}</p>
			</p>
			<Link
				to={"/"}
				className="mt-3 rounded-md border bg-red-500 px-5 py-1 text-white hover:bg-red-700"
			>
				Return to home
			</Link>
		</div>
  );
}