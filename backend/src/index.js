import initRxDB from "./rxdb/index.js";
import { createRxServer } from "rxdb-server/plugins/server";
import { RxServerAdapterExpress } from "rxdb-server/plugins/adapter-express";
import authHandler from "./middleware/authHandler.js";
import addMiddleware from "./middleware/index.js";
import addRoutes from "./routes/index.js";
import cors from "cors";

// Initialise RxDB.
const db = await initRxDB();

// Create server.
const rxServer = await createRxServer({
  database: db,
  adapter: RxServerAdapterExpress,
  port: 443,
  authHandler,
});

let allowedOrigins = ["http://localhost:443", "http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
    origin: allowedOrigins.includes(req.header("Origin")),
    credentials: true,
  };
  callback(null, corsOptions);
};
rxServer.serverApp.use(cors(corsOptionsDelegate));

// Add middleware.
await addMiddleware(rxServer);

// Add routes.
await addRoutes(rxServer);

// Start the server.
await rxServer.start();

export default rxServer;
