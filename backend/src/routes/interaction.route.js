export default function addInteractionRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "interaction",
    collection: rxServer.database.collections.interactions,
  });
}
