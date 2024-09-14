import initRxDB from "./rxdb/index.js";
import { createRxServer } from "rxdb-server/plugins/server";
import { RxServerAdapterExpress } from "rxdb-server/plugins/adapter-express";
import session from "express-session";
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

// Add session support.
rxServer.serverApp.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

// Add routes.
await addRoutes(rxServer);

// Start the server.
await rxServer.start();

export default rxServer;
