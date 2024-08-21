import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import setAuthToken, { setAuthTokenHTTP } from "@/lib/set-auth-token";

type TState = {
	expiresIn: number;
	accessToken: string;
	refreshToken: string;
	name: string;
	job: string;
	email: string;
	isAuthenticated: boolean;
};
type TAction = {
	setUser: (payload: any) => void;
	reset: () => void;
};
// Initial state
const initialState: TState = {
	expiresIn: 0,
	accessToken: "",
	refreshToken: "",
	name: "",
	job: "",
	email: "",
	isAuthenticated: false,
};
const useAuthStore = create<TState & TAction>()(
	immer(
		devtools(
			persist(
				(set) => ({
					...initialState,
					setUser: (payload) =>
						set((state) => ({
							...state,
							expiresIn: payload.exp,
							accessToken: payload.accessToken,
							refreshToken: payload.refreshToken,
							email: payload.email,
							name: payload.name,
							job: payload.jobTitle,
							isAuthenticated: true,
						})),

					reset: () => {
						set(initialState);
						setAuthToken(false);
						setAuthTokenHTTP(false);
					},
				}),
				{
					name: "storage-name",
					// getStorage: ()=> sessionStorage
				},
			),
			{
				enabled: process.env.NODE_ENV === "development",
				name: "user-auth-store",
			},
		),
	),
);

export default useAuthStore;
