import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

type RouteError = {
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-500">
      <h1 className="font-montserrat text-3xl ">Oops!</h1>
      <p>
        <i>{`Page ${error.statusText.toLocaleLowerCase()}`}</i>
      </p>
      <Link to={'/'} className="border px-5 py-1 bg-red-500 text-white rounded-md mt-3">Home</Link>
    </div>
  );
}