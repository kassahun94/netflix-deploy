import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Input from "./components/Input";
import axios from "axios";
import Image from "next/image";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [variant, setVariant] = useState("login");
	const [errorMessage, setErrorMessage] = useState("");

	const toggleVariant = () => {
		setVariant(variant === "login" ? "signup" : "login");
		setErrorMessage("");
	};

	const handleEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(ev.target.value);
	};

	const handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(ev.target.value);
	};

	const handleUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(ev.target.value);
	};

	const handleLogin = async () => {
		if (!email || !password) {
			setErrorMessage("Email and password are required");
			return;
		}

		try {
			const result = await signIn("credentials", {
				email,
				password,
				callbackUrl: "/profile",
			});

			if (result?.error) {
				setErrorMessage("Login error: " + result.error);
			}
		} catch (error) {
			setErrorMessage("An unexpected error occurred during login.");
		}
	};

	const register = useCallback(async () => {
		if (!email || !password || !username) {
			setErrorMessage("Email, username, and password are required");
			return;
		}

		try {
			const response = await axios.post("/api/register", {
				email,
				name: username,
				password,
			});

			// If registration is successful, you can handle redirection or login here
			await signIn("credentials", {
				email,
				password,
				callbackUrl: "/profile",
			});
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 409) {
				setErrorMessage("User already exists. Please use a different email.");
			} else {
				setErrorMessage("An unexpected error occurred during registration.");
			}
		}
	}, [email, password, username]);

	return (
		<div
			className="relative h-screen w-screen bg-no-repeat bg-center bg-cover"
			style={{ backgroundImage: `url('/images/symbol.jpg')` }}
		>
			<div className="bg-black w-full h-full flex lg:bg-opacity-50 items-center justify-center">
				<nav className="px-12 py-5 absolute top-0 left-0 right-0">
					<Image src="/images/logo.png" alt="Logo" height={80} width={80} />
				</nav>
				<div className="flex justify-center w-full h-full">
					<div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
						<h2 className="text-white text-4xl mb-8 font-semibold">
							{variant === "login" ? "Login" : "Sign up"}
						</h2>
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
						<div className="flex flex-col gap-4">
							<Input
								id="email"
								label="Email"
								type="email"
								value={email}
								onChange={handleEmailChange}
							/>
							{variant === "signup" && (
								<Input
									id="username"
									label="Username"
									type="text"
									value={username}
									onChange={handleUsernameChange}
								/>
							)}
							<Input
								id="password"
								label="Password"
								type="password"
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						<button
							onClick={variant === "login" ? handleLogin : register}
							className="bg-red-600 text-white rounded-md py-3 w-full mt-10 hover:bg-red-700 transition"
							aria-label={variant === "login" ? "Login" : "Create Account"}
						>
							{variant === "login" ? "Login" : "Create Account"}
						</button>
						<div className="flex flex-row items-center gap-4 mt-8 justify-center">
							<div
								onClick={() => signIn("google", { callbackUrl: "/profile" })}
								className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
								aria-label="Sign in with Google"
							>
								<FcGoogle size={30} />
							</div>
							<div
								onClick={() => signIn("github", { callbackUrl: "/profile" })}
								className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
								aria-label="Sign in with GitHub"
							>
								<FaGithub size={30} />
							</div>
						</div>
						<p className="text-neutral-500 text-center mt-12">
							{variant === "login"
								? "Don't have an account?"
								: "Already have an account?"}
							<span
								onClick={toggleVariant}
								className="text-white ml-1 hover:underline cursor-pointer"
							>
								{variant === "login" ? "Sign up" : "Login"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
