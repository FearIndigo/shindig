export default function addCommentRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "comment",
    collection: rxServer.database.collections.comments,
  });
}
