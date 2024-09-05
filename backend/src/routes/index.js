import useAuth from "./auth.route.js";

export default function addRoutes(rxServer) {
  // Add Auth.js routes.
  useAuth(rxServer.serverApp);

  // Add rxServer endpoints.
}
