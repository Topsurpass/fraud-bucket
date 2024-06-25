import bcrypt from "bcrypt";
import prisma from "../../utils/db.js";
import jwt from "jsonwebtoken";

function generateAccessToken(user) {
	return jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1m" },
	);
}

function generateRefreshToken(user) {
	return jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "5m" },
	);
}
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
		res.status(201).json({ "New user created": newUser });
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
		// Add more info you would love to pass to the frontend when fully authorized
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		await prisma.user.update({
			where: { id: user.id, email: user.email },
			data: { refreshToken },
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Use secure cookies in production
			sameSite: "strict",
		});

		res.status(200).json({
			accessToken,
			refreshToken,
			user: { id: user.id, email: user.email },
		});

		// res.status(200).json({
		// 	user: { id: user.id, email: user.email },
		// 	accessToken,
		// 	refreshToken,
		// });
	}

	static async getnewToken(req, res) {
		// const { token } = req.body;
		const token = req.cookies.refreshToken;

		if (!token) {
			return res.status(403).json({ error: "Refresh token is required" });
		}

		try {
			const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
			const user = await prisma.user.findUnique({
				where: { id: decoded.userId },
			});

			if (!user || user.refreshToken !== token) {
				return res.status(403).json({ error: "Invalid refresh token" });
			}

			const accessToken = generateAccessToken(user);
			const newRefreshToken = generateRefreshToken(user);

			await prisma.user.update({
				where: { id: user.id, email: user.email },
				data: { refreshToken: newRefreshToken },
			});

			res.status(200).json({
				accessToken,
				// refreshToken: newRefreshToken,
			});
		} catch (error) {
			res.status(403).json({ error: "Invalid refresh token" });
		}
	}
}
