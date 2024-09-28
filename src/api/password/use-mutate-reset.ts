import { useMutation } from "@tanstack/react-query";
import { HTTP } from "@/lib/http-clients";

type RequestPayload = {
	passcode: string;
	password: string;
};

const url = `/api/v1/user/password-reset`;

export default function useMutateResetPass() {
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
