import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/user-store";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const { isAuthenticated, expiresIn, reset } = useAuthStore((state) => ({
		isAuthenticated: state.isAuthenticated,
		expiresIn: state.expiresIn,
		reset: state.reset,
	}));

	useEffect(() => {
		const currentTime = Date.now() / 1000;

		if (expiresIn < currentTime) {
			reset();
		}
	}, [expiresIn, reset]);

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}

export default ProtectedRoute;
