import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const saltRounds = 10;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { email, password, username } = req.body;

	if (!email || !password || !username) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
				name: "",
			} as Prisma.UserCreateInput,
		});

		return res.status(200).json({ message: "User created successfully", user });
	} catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
