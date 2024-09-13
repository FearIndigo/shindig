import type { RxCollectionCreator } from "rxdb";
import eventSchema from "../schemas/eventSchema.js";
import type { EventType } from "../types/schema.js";

const events = {
  schema: eventSchema,
} satisfies RxCollectionCreator<EventType>;

export default events;
