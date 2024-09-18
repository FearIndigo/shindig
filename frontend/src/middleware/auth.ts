export default defineNuxtRouteMiddleware(async () => {
  // Ignore auth middleware on server.
  if (import.meta.server) return;

  // Abort navigation if user not logged in.
  const session = await useSessionData();
  if (!session.passport?.user) {
    return abortNavigation({
      statusCode: 401,
      statusMessage: "Unauthorized: You must be logged in to view this page.",
    });
  }
});
