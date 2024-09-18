import type { UserType } from "~/rxdb/types";

interface ISessionData {
  cookie: {
    expires: string;
    httpOnly: boolean;
    originalMaxAge: number;
    path: string;
  };
  passport?: {
    user: UserType & { email: string };
  };
}

let session: ISessionData;

export default async function useSessionData() {
  if (isSessionValid()) return session;

  const config = useRuntimeConfig();
  const response = await fetch(config.public.apiBase + "/auth/session", {
    credentials: "include",
  });
  session = await response.json();

  return session;
}

function isSessionValid() {
  // No session data.
  if (!session) return false;

  // Session expired or missing user data.
  const sessionExpired =
    new Date(session.cookie.expires).getTime() - Date.now() <= 0;
  if (sessionExpired || !session.passport) {
    return false;
  }

  // Session is valid.
  return true;
}
