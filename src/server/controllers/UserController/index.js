import bcrypt from "bcrypt";
import prisma from "../../utils/db.js";

export default class UserController {
	/**
	 * Register new user
	 * @param {Request} req
	 * @param {Response} res
	 * @returns JSON
	 */
	static async signUp(req, res) {
		const email = req.body ? req.body.email : null;
		const password = req.body ? req.body.password : null;

		if (!email) {
			res.status(400).json({ error: "Missing email" });
			return;
		}
		if (!password) {
			res.status(400).json({ error: "Missing password" });
			return;
		}
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (user) {
			res.status(400).json({ error: "Email already exist" });
			return;
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});
		res.status(201).json({ "New user created": email });
	}

	static async signIn(req, res) {
		/**
		 * Sign in user
		 * @param {Request} req
		 * @param {Response} res
		 * @returns JSON
		 */
		const email = req.body ? req.body.email : null;
		const password = req.body ? req.body.password : null;

		if (!email) {
			res.status(400).json({ error: "Missing email" });
			return;
		}
		if (!password) {
			res.status(400).json({ error: "Missing password" });
			return;
		}
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user) {
			res.status(400).json({ error: "Email does not exist !" });
			return;
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
            res.status(400).json({ error: "Incorrect password !" });
            return;
		}

		res.status(200).json({ data: email });
	}
}
