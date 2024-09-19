import addCollectionMiddleware from "../middleware/index.js";
import comments from "./commentCollection.js";
import events from "./eventCollection.js";
import interactions from "./interactionCollection.js";
import users from "./userCollection.js";
import type { Database } from "../types/database.js";

export default async function addCollections(db: Database) {
  const collections = await db.addCollections({
    comments,
    events,
    interactions,
    users,
  });

  // Add collection middleware.
  Object.values(collections).forEach((collection) =>
    addCollectionMiddleware(collection)
  );
}
