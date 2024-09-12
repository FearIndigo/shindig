export default function addEventRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "event",
    collection: rxServer.database.collections.events,
  });
}
