import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import Login from "@/pages/Login";
import {createBrowserRouter} from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage/>
  },
   {
    path: "/login",
    element: <Login />,
  },
]);