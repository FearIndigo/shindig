import { getSession } from "@auth/express";
import { authConfig } from "../routes/auth.route.js";

export default async function authHandler(headers) {
  const session = await getSession(
    new Request({ protocol: "http", headers }),
    authConfig
  );
  const validUntil = new Date(session?.expires).getTime();

  return {
    data: session,
    validUntil,
  };
}
