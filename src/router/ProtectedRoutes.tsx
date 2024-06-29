import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "@/server/utils/auth";
import { useToast } from "@/components/ui/use-toast";

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const { logout, generateNewToken } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
			const savedToken = localStorage.getItem("token");
			if (!savedToken) {
				logout();
				navigate("/login", { replace: true });
				toast({
					title: "Session Expired",
					description: "Please login to return",
					className: "bg-red-500 text-white h-[70px]",
				});
			}
            if ((savedToken) && isTokenExpired(savedToken)) {
                try {
                    const newAccessToken = await generateNewToken();
                    if (newAccessToken) {
                        localStorage.setItem("token", newAccessToken);
                        setIsCheckingToken(false);
                    } else {
                        logout();
                        navigate("/login", { replace: true });
                        toast({
                            title: "Session Expired",
                            description: "Please login to return",
                            className: "bg-red-500 text-white h-[70px]",
                        });
                    }
                } catch (error) {
                    logout();
                    navigate("/login", { replace: true });
                    toast({
                        title: "Session Expired",
                        description: "Please login to return",
                        className: "bg-red-500 text-white h-[70px]",
                    });
                }
            } else {
                setIsCheckingToken(false);
            }
        };
        checkToken();
    }, [navigate, logout, generateNewToken, toast]);

	if (isCheckingToken) {
        return null; 
    }

    return children;
}
