import axios from "axios";
import config from "@/@config"

const token = localStorage.getItem("shw_id");

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
		if (token !== null && token !== undefined && token) {
			setting.headers.Authorization = `Bearer ${token}`;
			return setting;
		}
		return setting;
	},
	(err: any) => {
		return Promise.reject(err);
	},
);

export default AuthHTTP;
