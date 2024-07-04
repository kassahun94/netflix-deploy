import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prismadb = new PrismaClient();

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("not signed in");
    
  }
  const currentUser = await prismadb.user.findUnique({
    where: { email: session.user.email },})
    if (!currentUser) {
      throw new Error("user not found");
    }
    return {currentUser};
}


export default serverAuth;