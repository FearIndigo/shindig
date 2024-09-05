import { createRxDatabase } from "rxdb";
import { getRxStorageMongoDB } from "rxdb/plugins/storage-mongodb";

export default async function createRxDB() {
  // Create database and connect to MongoDB.
  const db = await createRxDatabase({
    name: "shindigdb",
    storage: getRxStorageMongoDB({
      connection: process.env.MONGODB_URI,
    }),
  });

  return db;
}
