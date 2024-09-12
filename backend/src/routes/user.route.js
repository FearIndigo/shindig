/**@param {import("rxdb-server").RxServer} rxServer  */
export default function addUserRoutes(rxServer) {
  // Replication endpoint.
  rxServer.addReplicationEndpoint({
    name: "user",
    collection: rxServer.database.collections.users,
    serverOnlyFields: ["email"],
  });
}
