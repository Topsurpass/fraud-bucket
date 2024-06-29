import express from "express";
import injectRoutes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
const server = express();

const port = process.env.SERVER_PORT;
const corsOptions = {
	origin: "http://localhost:5173", // Replace with your frontend URL
	credentials: true, // Allow credentials (cookies)
};
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

injectRoutes(server);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
