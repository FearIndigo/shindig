import { getSession } from "@auth/express";
import { authConfig } from "../auth/index.js";

export default async function authHandler(headers) {
  const req = {
    protocol: "http",
    headers,
  };
  const session = await getSession(req, authConfig);
  const validUntil = new Date(session?.expires).getTime();

  return {
    data: session,
    validUntil,
  };
}
