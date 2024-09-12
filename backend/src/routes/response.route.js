export default function addResponseRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "response",
    collection: rxServer.database.collections.responses,
  });
}
