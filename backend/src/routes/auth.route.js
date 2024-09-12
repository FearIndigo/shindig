import { ExpressAuth } from "@auth/express";
import { authConfig } from "../auth/index.js";

export default function addAuthRoutes(rxServer) {
  // Add Auth.js routes
  rxServer.serverApp.set("trust proxy", true);
  rxServer.serverApp.use("/auth/*", ExpressAuth(authConfig));
}
