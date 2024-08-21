import React from "react";
import ReactQueryProvider from "./react-query-provider";
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
		<ReactQueryProvider>
			{children}
			<ToastProvider />
		</ReactQueryProvider>
	);
}
