import express from "express";
import injectRoutes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const server = express();

const port = process.env.SERVER_PORT;
const allowedOrigins = [
	process.env.VITE_BASE_API_URL, // Add your frontend URL from environment variables
];

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(null, true); // change this to effect CORS
		}
	},
	credentials: true, // Allow credentials (cookies)
};

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

injectRoutes(server);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
