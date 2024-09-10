import { getSession } from "@auth/express";

export default async function authHandler(headers) {
  const session = await getSession(new Request({ protocol: "https", headers }));
  const validUntil = new Date(session?.expires).getTime();
  return {
    data: session,
    validUntil,
  };
}
