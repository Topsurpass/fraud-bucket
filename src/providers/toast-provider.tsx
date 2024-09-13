import { Toaster as SonnerToaster } from "sonner";

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function ToastProvider() {
	return (
		<SonnerToaster
			position="bottom-right"
			richColors
			offset={50}
			closeButton
			toastOptions={{
				duration: 2 * 1000, // 8secs
			}}
		/>
	);
}
