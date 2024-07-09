import express from "express";
import injectRoutes from "./routes/index.js";
import cors from "cors";
import ngrok from "@ngrok/ngrok";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const server = express();

const port = process.env.SERVER_PORT || 3000;
const allowedOrigins = [
	"http://localhost:5173",
	process.env.FRONTEND_URL, // Add your frontend URL from environment variables
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

ngrok
	.listen(server)
	.then(() => {
		console.log("established listener at: " + server.listener.url());
	})
	.catch((error) => {
		console.error("Error starting ngrok listener:", error);
	});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
