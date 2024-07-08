// pages/profile.tsx
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PrismaClient, User } from "@prisma/client"; // Import User from PrismaClient

const prisma = new PrismaClient();

// Define a TypeScript interface for the user object
interface UserProfile {
	name: string;
	username: string;
	email: string;
}

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session || !session.user?.email) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	// Fetch user data from the database based on the email from the session
	const user: User | null = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
	});

	if (!user) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	const userProfile: UserProfile = {
		name: user.name,
		username: user.username,
		email: user.email,
	};

	return {
		props: {
			user: userProfile, 
		},
	};
}

const Profile = ({ user }: { user: UserProfile }) => {
	const router = useRouter();

	if (!user) {
		return <div>Loading...</div>; 
	}

	return (
		<div className="flex items-center justify-center h-screen bg-gray-900">
			<div className="flex flex-col items-center justify-center gap-8">
				<h1 className="text-3xl md:text-6xl text-white text-center">
					Who is watching?
				</h1>
				<div className="group flex flex-col items-center">
					<div
						className="w-44 h-44 rounded-md overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white"
						onClick={() => router.push("/")}
					>
						<div className="relative w-full h-full">
							<Image
								src="/images/avatar.png"
								alt="Profile Avatar"
								layout="fill"
								objectFit="cover"
							/>
						</div>
					</div>
					<div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
						{user ?.name}
					</div>
					<div className="text-gray-400 text-lg text-center">
						{user.username}
					</div>
					<div className="text-gray-400 text-lg text-center">{user.email}</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
