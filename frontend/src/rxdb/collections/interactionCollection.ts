import type { RxCollectionCreator } from "rxdb";
import interactionSchema from "../schemas/interactionSchema.js";
import type { InteractionType } from "../types/schema.js";

const interactions = {
  schema: interactionSchema,
} satisfies RxCollectionCreator<InteractionType>;

export default interactions;
