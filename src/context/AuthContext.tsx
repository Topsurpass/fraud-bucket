import {
	createContext,
	PropsWithChildren,
	useContext,
	useState,
	FC,
} from "react";

type User = {
	id: number;
	email: string;
};

type AuthContextType = {
	user: User | null;
	login: (token: string, user: User) => void;
	logout: () => void;
	generateNewToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = (token: string, user: User) => {
		localStorage.setItem("token", token);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	const generateNewToken = async () => {
		try {
			const response = await fetch("http://localhost:3000/newToken", {
				method: "POST",
				credentials: "include", // Include cookies in the request
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to refresh token");
			}

			const data = await response.json();
			const { accessToken } = data;

			localStorage.setItem("token", accessToken);
		} catch (error) {
			console.error("Failed to refresh token:", error);
			logout();
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, generateNewToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
