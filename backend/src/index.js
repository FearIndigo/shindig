import initRxDB from "./database/index.js";
import { createRxServer } from "rxdb-server/plugins/server";
import { RxServerAdapterExpress } from "rxdb-server/plugins/adapter-express";
import authHandler from "./auth/index.js";
import addRoutes from "./routes/index.js";

// Initialise RxDB.
const db = await initRxDB();

// Create server.
const rxServer = await createRxServer({
  database: db,
  adapter: RxServerAdapterExpress,
  port: process.env.PORT,
  authHandler,
});

// Add routes.
addRoutes(rxServer);

// Start the server.
await rxServer.start();

console.log(`App is running on http://localhost:${process.env.PORT}`);
