import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const myHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		await serverAuth(req);

		const movies = await prismadb.movie.findMany();

		return res.status(200).json({ movies });
	} catch (e) {
		console.error(e);
		return res.status(400).end();
	}
};

export default myHandler;
