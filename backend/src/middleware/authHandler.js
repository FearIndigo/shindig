import cookie from "cookie";
import signature from "cookie-signature";

export default async function authHandler(headers) {
  const sessionCookie = cookie.parse(headers.cookie)["connect.sid"];
  const sessionId = signature.unsign(
    sessionCookie.slice(2),
    process.env.AUTH_SECRET
  );
  const validUntil = Date.now() * 2;

  return {
    data: {
      sessionId: sessionId,
    },
    validUntil,
  };
}
