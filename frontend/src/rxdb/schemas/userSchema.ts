import type { JSONSchema } from "json-schema-to-ts";

const userSchema = {
  title: "user schema",
  version: 0,
  description: "describes a user",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      format: "uuid",
    },
    name: {
      type: "string",
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: ["id", "name"],
  indexes: ["updatedAt"],
} as const satisfies JSONSchema & Record<string, unknown>;

export default userSchema;
