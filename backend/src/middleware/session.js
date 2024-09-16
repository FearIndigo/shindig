import session, { MemoryStore } from "express-session";

export const store = new MemoryStore();

export default function addSessionMiddleware(rxServer) {
  // Add session middleware support.
  rxServer.serverApp.use(
    session({
      secret: process.env.AUTH_SECRET,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      cookie: { maxAge: 604800000 }, // Cookie expires after 1 week
      store,
    })
  );
}
