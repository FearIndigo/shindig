import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import type { Database, DatabaseCollections } from "../types";

export default async function createRxDB() {
  // Create database and connect to MongoDB.
  const db: Database = await createRxDatabase<DatabaseCollections>({
    name: "shindigdb",
    storage: getRxStorageDexie(),
  });

  return db;
}
