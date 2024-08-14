import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end(); // Method Not Allowed
	}

	try {
		const user = await serverAuth(req); // Ensure user authentication

		const userData = await prismadb.user.findUnique({
			where: { id: user.currentUser.id },
		});

		if (!userData) {
			return res.status(404).json({ message: "User not found" }); // User not found
		}

		return res.status(200).json(userData); // Success
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" }); // Internal server error
	}
}
