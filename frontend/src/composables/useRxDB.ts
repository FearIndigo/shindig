import initRxDB from "~/rxdb";
import type { Database } from "~/rxdb/types";

let db: Database;

export default async function useRxDB() {
  if (db) return db;
  db = await initRxDB();
  return db;
}
