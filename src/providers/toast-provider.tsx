import { Toaster as SonnerToaster } from "sonner";

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function ToastProvider() {
	return (
		<SonnerToaster
			position="bottom-right"
			richColors
			offset={100}
			closeButton
			toastOptions={{
				duration: 8 * 1000, // 8secs
			}}
		/>
	);
}
