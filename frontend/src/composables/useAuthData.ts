export default async function useAuthData() {
  const config = useRuntimeConfig();
  return fetch(config.public.apiBase + "/auth/session", {
    headers: {
      Accept: "application/json",
    },
  });
}
