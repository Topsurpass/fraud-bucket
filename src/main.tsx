import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "@/router/routes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import {AuthProvider} from "@/context/AuthContext";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Toaster />
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
);
