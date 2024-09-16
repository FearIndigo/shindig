import cookie from "cookie";
import signature from "cookie-signature";
import { store } from "./session.js";

export default async function authHandler(headers) {
  // Get session id from cookie header.
  const sessionCookie = cookie.parse(headers.cookie)["connect.sid"];
  const sessionId = signature.unsign(
    sessionCookie.slice(2),
    process.env.AUTH_SECRET
  );

  // Get session from store.
  const session = await new Promise((res, rej) => {
    store.get(sessionId, (e, s) => {
      res(s);
    });
  });

  // Get session valid until.
  const validUntil = session
    ? new Date(session.cookie.expires).getTime()
    : Date.now() * 2;

  return {
    data: {
      session,
    },
    validUntil,
  };
}
