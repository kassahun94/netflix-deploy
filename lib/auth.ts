// lib/auth.ts
import bcrypt from "bcrypt";

const saltRounds = 10; // Adjust according to your security requirements

export const hashPassword = async (password: string): Promise<string> => {
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		throw new Error("Error hashing password");
	}
};

export default hashPassword;
