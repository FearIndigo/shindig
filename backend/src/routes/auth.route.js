import { ExpressAuth } from "@auth/express";
import Keycloak from "@auth/express/providers/keycloak";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../lib/db.js";

export default function useAuth(serverApp) {
  serverApp.set("trust proxy", true);
  serverApp.use(
    "/auth/*",
    ExpressAuth({
      providers: [Keycloak],
      adapter: MongoDBAdapter(client),
      trustHost: true,
    })
  );
}
