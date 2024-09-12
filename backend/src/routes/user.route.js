export default function addUserRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "user",
    collection: rxServer.database.collections.users,
  });

  // REST endpoints.
  rxServer.addRestEndpoint({
    name: "user",
    collection: rxServer.database.collections.users,
  });
}
