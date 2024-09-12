import { ExpressAuth } from "@auth/express";
import Keycloak from "@auth/express/providers/keycloak";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../lib/mongo-client.js";

export const authConfig = {
  providers: [Keycloak],
  adapter: MongoDBAdapter(client),
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      return session;
    },
  },
};

export default function useAuth(serverApp) {
  // Add Auth.js routes
  serverApp.set("trust proxy", true);
  serverApp.use("/auth/*", ExpressAuth(authConfig));
}
