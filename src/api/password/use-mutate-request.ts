import { useMutation } from "@tanstack/react-query";
// import AuthHTTP from "@/lib/http-clients";
import { HTTP } from "@/lib/http-clients";


type RequestPayload = {
	email: string;
};

const url = `/api/v1/user/request-password-reset`;

export default function useMutateReqPass() {
	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await HTTP.post(url, requestPayload);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
	});
}
