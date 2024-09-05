import { getSession } from "@auth/express";

export default async function authHandler(headers) {
  console.log(headers);
  return await getSession(new Request({ protocol: "https", headers }));
}
