// pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });

	if (!session?.user?.email) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email },
			select: {
				email: true,
			},
		});

		if (!currentUser) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json(currentUser);
	} catch (error) {
		console.error("Error fetching current user:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
