import { useQuery } from "@tanstack/react-query";
import authHTTP from "@/lib/http-clients";
import QueryKeys from "@/api/query-keys";

interface IParameters {
	[key: string]: any;
}

const url = `/api/v1/user`;

export default function useGetUser(requestParams: IParameters = {}) {
	return useQuery({
		queryKey: [QueryKeys.GET_USERS, requestParams],
		queryFn: async () => {
			try {
				const res = await authHTTP.get(url, {
					params: {
						...requestParams,
					},
				});
				return res?.data?.data;
			} catch (error) {
				return Promise.reject(error);
			}
		},
	});
}
