export default function addResponseRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "response",
    collection: rxServer.database.responses,
  });
}
