// pages/profile.tsx
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useCurrentUser from "../hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}

const Profile = () => {
	const router = useRouter();
	const { data: user, isLoading } = useCurrentUser();

	if (isLoading) {
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
						{user ? user.username : "User Name"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
