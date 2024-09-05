import users from "./userCollection.js";
import events from "./eventCollection.js";
import comments from "./commentCollection.js";
import interactions from "./interactionCollection.js";

export default async function addCollections(db) {
  await db.addCollections({
    users,
    events,
    comments,
    interactions,
  });
}
