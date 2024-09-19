import type { JSONSchema } from "json-schema-to-ts";

const interactionSchema = {
  title: "interaction schema",
  version: 0,
  description: "describes an interaction",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      format: "uuid",
    },
    userId: {
      type: "string",
      ref: "users",
      format: "uuid",
    },
    type: {
      type: "string",
      enum: ["Like", "Heart", "Laugh", "Sad", "Cry"],
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: ["id", "userId", "type"],
  indexes: ["updatedAt"],
} as const satisfies JSONSchema & Record<string, unknown>;

export default interactionSchema;
