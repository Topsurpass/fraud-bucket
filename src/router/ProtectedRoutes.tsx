import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "@/server/utils/auth";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { logout, generateNewToken } = useAuth();
	const navigate = useNavigate();
	const savedToken = localStorage.getItem("token");

	useEffect(() => {
		const checkToken = async () => {
			if (!savedToken) {
				logout();
				navigate("/login", { replace: true });
				return;
			}
			if (isTokenExpired(savedToken)) {
				try {
					await generateNewToken(); // Attempt to refresh token
					// Optionally, you might want to reload or navigate to a desired page
				} catch (error) {
					console.error("Failed to refresh token:", error);
					logout();
					navigate("/login", { replace: true });
				}
			}
		};
		checkToken();
	}, [savedToken, navigate, logout, generateNewToken]);

	// if (!savedToken || isTokenExpired(savedToken)) {
	// 	logout();
	// 	navigate("/login", { replace: true });
	// 	return null;
	// }
    return children;
}
