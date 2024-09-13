import { toast } from "sonner";
import { setAuthTokenHTTP } from "@/lib/set-auth-token";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authHTTP from "@/lib/http-clients";

const url = `/api/v1/auth/newToken`;

export default function useRefreshUser() {
	const { refreshToken, reset } = useAuthStore((state) => ({
		refreshToken: state.refreshToken,
		reset: state.reset,
	}));

	return useMutation({
		mutationFn: async () => {
			try {
				const res = await authHTTP.post(url, { refreshToken });
				return res.data;
			} catch (error: any) {
				return Promise.reject(error);
			}
		},
		onSuccess: (res) => {
			const { accessToken } = res;
			setAuthTokenHTTP(accessToken);
			const decodedToken = jwtDecode(accessToken);
			useAuthStore.getState().setUser({
				accessToken,
				...decodedToken,
            });
		},
		onError: (err: any) => {
			toast.error("Token Expired", {
				description: err?.response?.data?.error,
			});
			reset();
			useNavigate()("/login");

		},
	});
}
