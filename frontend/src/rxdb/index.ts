import addRxPlugins from "./plugins/index.js";
import createRxDB from "./database/index.js";
import addCollections from "./collections/index.js";
import replicateServer from "./replication/index.js";

export default async function initRxDB() {
  // Add plugins.
  addRxPlugins();

  // Create database.
  const db = await createRxDB();

  // Create collections.
  await addCollections(db);

  // Init server replication.
  replicateServer(db);

  return db;
}
