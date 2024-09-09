import useAuth from "./auth.route.js";

export default async function addRoutes(rxServer) {
  // Add Auth.js routes.
  useAuth(rxServer.serverApp);

  // Add rxServer endpoints.
}
