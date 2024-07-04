import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createUser(email: string, password: string) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	return prisma.user.create({
		data: {
			email,
			hashedPassword,
			name: "", // Add a name property
			username: "", // Add a username property
		},
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("Request method:", req.method);
	console.log("Request body:", req.body); // Log the request body

	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Email and password are required" });
	}

	try {
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await createUser(email, password);

		return res
			.status(201)
			.json({ message: "User created successfully", user: user });
	} catch (error: any) {
		console.error("Error creating user:", error);
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}

	try {
		const user = await createUser(email, password);

		return res
			.status(201)
			.json({ message: "User created successfully", user: user });
	} catch (error: any) {
		console.error("Error creating user:", error);
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
}
