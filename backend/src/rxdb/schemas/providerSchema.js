export default {
  title: "auth provider schema",
  version: 0,
  description: "describes an auth provider",
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
    provider: {
      type: "string",
      format: "uri",
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: ["id", "userId", "provider"],
  indexes: ["updatedAt"],
};
