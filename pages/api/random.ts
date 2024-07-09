// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		const user = await serverAuth(req);
		const userData = await prismadb.user.findUnique({
			where: {
				id: user.currentUser.id,
			},
		});

		if (!userData) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json(userData);
	} catch (e) {
		console.error(e);
		return res.status(401).json({ message: "Unauthorized" });
	}
}
