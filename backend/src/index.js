import initRxDB from "./rxdb/index.js";
import { createRxServer } from "rxdb-server/plugins/server";
import { RxServerAdapterExpress } from "rxdb-server/plugins/adapter-express";
import authHandler from "./middleware/authHandler.js";
import addRoutes from "./routes/index.js";

// Initialise RxDB.
const db = await initRxDB();

// Create server.
const rxServer = await createRxServer({
  database: db,
  adapter: RxServerAdapterExpress,
  port: 443,
  authHandler,
});

// Add routes.
await addRoutes(rxServer);

// Start the server.
await rxServer.start();

export default rxServer;
