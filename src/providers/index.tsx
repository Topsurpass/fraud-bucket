import React from "react";
import ReactQueryProvider from "./react-query-provider";
import { GlobalProvider } from "./global-provider";
// import ThemeProvider from "./theme-provider";
import ToastProvider from "./toast-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		// <ThemeProvider
		// // defaultTheme="light"
		// // attribute="class"
		// // enableSystem
		// // disableTransitionOnChange
		// >

		// </ThemeProvider>
		<GlobalProvider>
			<ReactQueryProvider>
				{children}
				<ToastProvider />
			</ReactQueryProvider>
		</GlobalProvider>
	);
}
