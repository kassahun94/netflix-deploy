import { PrismaClient } from "@prisma/client";

declare global {
	var prismadb: PrismaClient;
}

const client =
	globalThis.prismadb ||
	new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
	});

if (process.env.NODE_ENV === "production") {
	globalThis.prismadb = client;
}

export default client;
