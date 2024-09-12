import comments from "./commentCollection.js";
import events from "./eventCollection.js";
import interactions from "./interactionCollection.js";
import responses from "./responseCollection.js";
import users from "./userCollection.js";

export default async function addCollections(db) {
  await db.addCollections({
    comments,
    events,
    interactions,
    responses,
    users,
  });
}
