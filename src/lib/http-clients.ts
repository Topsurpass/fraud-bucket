import axios from "axios";
import config from "@/@config";
import useAuthStore from "@/stores/user-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// PUBLIC HTTP client
export const HTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
});

// Authenticated HTTP client : for request that require accessToken
const AuthHTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
});

AuthHTTP.interceptors.request.use(
	async (setting: any) => {
		const {
			accessToken: token,
			expiresIn,
			reset,
		} = useAuthStore.getState();
		const currentTime = Date.now() / 1000;
		if (
			token !== null &&
			token !== undefined &&
			token &&
			expiresIn > currentTime
		) {
			setting.headers.Authorization = `Bearer ${token}`;
			return setting;
		} else {
			toast.error("Session Expired", {
				description: "Please Login again.",
			});
			reset();
			useNavigate()("/login");
			return;
		}
	},
	(err: any) => {
		return Promise.reject(err);
	},
);

export default AuthHTTP;

// import axios from "axios";
// import config from "@/@config";
// import useAuthStore from "@/stores/user-store";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import useGlobalProvider from "@/hooks/use-global-provider";

// // PUBLIC HTTP client
// export const HTTP = axios.create({
// 	baseURL: config.baseUrl,
// 	timeout: config.httpTimeout,
// });

// // Authenticated HTTP client : for request that require accessToken
// const AuthHTTP = axios.create({
// 	baseURL: config.baseUrl,
// 	timeout: config.httpTimeout,
// });

// AuthHTTP.interceptors.request.use(
// 	async (setting: any) => {
// 		const { onModalClose } = useGlobalProvider();
// 		const { accessToken, expiresIn, reset } = useAuthStore.getState();
// 		const currentTime = Date.now() / 1000;

// 		if (accessToken && expiresIn > currentTime) {
// 			setting.headers.Authorization = `Bearer ${accessToken}`;
// 			return setting;
// 		} else {
// 			toast.error("Session Expired", {
// 				description: "Please Login again.",
// 			});
// 			onModalClose();
// 			reset();
// 			useNavigate()("/login");

// 			return Promise.reject("Session expired, redirecting to login.");
// 		}
// 	},
// 	(err: any) => {
// 		return Promise.reject(err);
// 	},
// );

// export default AuthHTTP;
