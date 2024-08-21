import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { HTTP } from "@/lib/http-clients";
import { setAuthTokenHTTP } from "@/lib/set-auth-token";
import useAuthStore from "@/stores/user-store";

type RequestPayload = {
	email: string;
	password: string;
};

const useLoginUser = () => {
	const addUserToStore = useAuthStore((state) => state.setUser);
	const mutation = useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await HTTP.post("/signin", requestPayload);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		onSuccess: (res) => {
			const { accessToken, ...rest } = res.data;
			setAuthTokenHTTP(accessToken);
			const decodedToken = jwtDecode(accessToken);

			// TODO: remove the token in localStorage to avoid XSS attack
			//   localStorage.setItem("shw_id", token);
			addUserToStore({
				accessToken,
				...rest,
				...decodedToken,
			} as any); // TODO: replace any type with the correct one
			// window.location.reload();
		},
		onError: (err: any) => {
			toast.error("Login failed", {
				description: err?.response?.data?.error,
			});
		},
	});

	return mutation;
};

export default useLoginUser;
