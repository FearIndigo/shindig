import addCollectionMiddleware from "../middleware/index.js";
import comments from "./commentCollection.js";
import events from "./eventCollection.js";
import interactions from "./interactionCollection.js";
import providers from "./providerCollection.js";
import users from "./userCollection.js";

export default async function addCollections(db) {
  const collections = await db.addCollections({
    comments,
    events,
    interactions,
    providers,
    users,
  });

  // Add collection middleware.
  Object.values(collections).forEach((collection) =>
    addCollectionMiddleware(collection)
  );
}
