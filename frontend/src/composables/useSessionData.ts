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
  if (isSessionValid(session)) return session;

  const config = useRuntimeConfig();
  const response = await fetch(config.public.apiBase + "/auth/session", {
    credentials: "include",
  });
  session = await response.json();

  return session;
}

function isSessionValid(s?: ISessionData) {
  // No session data.
  if (!s) return false;

  // Session missing user data.
  if (!s.passport) {
    return false;
  }

  // Session expired.
  const sessionExpired = new Date(s.cookie.expires).getTime() - Date.now() <= 0;
  if (sessionExpired) {
    return false;
  }

  // Session is valid.
  return true;
}
