import cookie from "cookie";
import signature from "cookie-signature";
import { store } from "./session.js";

export default async function authHandler(headers) {
  let session;
  let validUntil = Date.now() * 2;

  if (headers.cookie) {
    // Get session id from cookie header.
    const sessionCookie = cookie.parse(headers.cookie)["connect.sid"];

    if (sessionCookie) {
      const sessionId = signature.unsign(
        sessionCookie.slice(2),
        process.env.AUTH_SECRET
      );

      // Get session from store.
      session = await new Promise((res, rej) => {
        store.get(sessionId, (e, s) => {
          res(s);
        });
      });

      if (session) {
        // Get session valid until.
        validUntil = new Date(session.cookie.expires).getTime();
      }
    }
  }

  return {
    data: {
      session,
    },
    validUntil,
  };
}
