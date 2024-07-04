// hooks/useCurrentUser.ts
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
	email: string;
	username: string;
}

const useCurrentUser = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("/api/user");
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []);

	return { data: user, isLoading };
};

export default useCurrentUser;
