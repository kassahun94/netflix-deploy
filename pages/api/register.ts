import { fromJSON } from './../../node_modules/next/node_modules/postcss/lib/postcss.d';
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prismadb from "../../lib/prismadb";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createUser(email: string, password: string) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	return prisma.user.create({
		data: {
			email,
			hashedPassword,
			name: "", 
			username: "", 
		},
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	if (req.method !== "POST") {
		return res.status(405).end ();
	}
	try {
		const { email, name, password } = req.body;
		const existingUser = await prisma.user.findUnique({
			where:{
				email,
			}
		})
		if(existingUser){
			return res.status(409).json({message: "User already exists"});
		}
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				email,
				name,
				username: "", // Add the username property
				hashedPassword,
				image: "",
				emailVerified: new Date(),
			},
		});
		return res.status(200).json({message: "User created successfully", user});

	} catch (error){
		console.log(error);
		return res.status(400).end();
	}
}
	

// 	if (!email || !password) {
// 		return res.status(400).json({ message: "Email and password are required" });
// 	}

// 	try {
// 		if (!email || !password) {
// 			return res
// 				.status(400)
// 				.json({ message: "Email and password are required" });
// 		}

// 		const user = await createUser(email, password);

// 		return res
// 			.status(201)
// 			.json({ message: "User created successfully", user: user });
// 	} catch (error: any) {
// 		console.error("Error creating user:", error);
// 		return res
// 			.status(500)
// 			.json({ message: "Internal Server Error", error: error.message });
// 	}

// 	try {
// 		const user = await createUser(email, password);

// 		return res
// 			.status(201)
// 			.json({ message: "User created successfully", user: user });
// 	} catch (error: any) {
// 		console.error("Error creating user:", error);
// 		return res
// 			.status(500)
// 			.json({ message: "Internal Server Error", error: error.message });
// 	}
// }
