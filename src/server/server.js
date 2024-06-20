import express from "express";
import injectRoutes from "./routes/index.js";
import cors from 'cors'
const server = express();

const port = process.env.SERVER_PORT;
server.use(cors());
server.use(express.json());

injectRoutes(server);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
