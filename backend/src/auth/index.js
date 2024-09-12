import Keycloak from "@auth/express/providers/keycloak";
import { v5 as uuidv5 } from "uuid";
import rxServer from "../index.js";

const USER_NAMESPACE = "1c24b562-6c5c-4176-b1dc-fed5328835de";

/** @type {import("@auth/express").ExpressAuthConfig} */
export const authConfig = {
  providers: [
    {
      ...Keycloak(),
      profile(profile) {
        return {
          userId: uuidv5(profile.email, USER_NAMESPACE),
          name: profile.preferred_username,
          email: profile.email,
        };
      },
    },
  ],
  trustHost: true,
  callbacks: {
    session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        // Send user id to token for request validation.
        token.userId = user.userId;

        if (trigger === "signIn") {
          // Try find user in database.
          const userCollection = rxServer.database.collections.users;
          const dbUser = await userCollection
            .findOne({
              selector: { id: user.userId },
            })
            .exec();
          // If no user found add them to the database.
          if (!dbUser) {
            await userCollection.insert({
              id: user.userId,
              name: user.name,
            });
          }
        }
      }
      return token;
    },
  },
};
