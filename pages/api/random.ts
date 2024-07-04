import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		return res.status(405).end();
	}
	try {
		await serverAuth(req);
		const MovieCount = await prismadb.movie.count();
		const randomIndex = Math.floor(Math.random() * MovieCount);
		const randomMovie = await prismadb.movie.findMany({
			take: 1,
			skip: randomIndex,
		});

		return res.status(200).json(randomMovie[0]);
	} catch (e) {
		console.error(e);
		return res.status(401).end(); // Unauthorized
	}
}