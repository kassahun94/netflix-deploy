import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "../../../lib/prismadb";
import { compare } from "bcrypt";
import githubProvider from "next-auth/providers/github";
import googleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
	providers: [
		// GitHub OAuth provider
		githubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		// Google OAuth provider
		googleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		// Credentials provider for email and password authentication
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials || !credentials.email || !credentials.password) {
					throw new Error("Email and password are required");
				}

				try {
					const user = await prismadb.user.findUnique({
						where: {
							email: credentials.email,
						},
					});

					if (!user || !user.hashedPassword) {
						throw new Error("Invalid email or password");
					}

					const isCorrect = await compare(
						credentials.password,
						user.hashedPassword
					);
					if (!isCorrect) {
						throw new Error("Invalid email or password");
					}

					return user;
				} catch (error) {
					console.error(error);
					throw new Error("Authentication failed");
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
	},
	debug: process.env.NODE_ENV === "development",
	adapter: PrismaAdapter(prismadb),
	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	// Secret used for NextAuth
	secret: process.env.NEXTAUTH_SECRET,
});