import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import {createBrowserRouter} from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage/>
  },
]);