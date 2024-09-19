import { FromSchema } from "json-schema-to-ts";
import type commentSchema from "../schemas/commentSchema";
import type eventSchema from "../schemas/eventSchema";
import type interactionSchema from "../schemas/interactionSchema";
import type userSchema from "../schemas/userSchema";

export type CommentType = FromSchema<typeof commentSchema>;
export type EventType = FromSchema<typeof eventSchema>;
export type InteractionType = FromSchema<typeof interactionSchema>;
export type UserType = FromSchema<typeof userSchema>;

export type ResponseType = FromSchema<
  typeof eventSchema.properties.responses.items
>;
