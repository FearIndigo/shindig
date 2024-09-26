export default {
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
    email: {
      type: "string",
      format: "email",
    },
    providers: {
      type: "array",
      items: {
        type: "string",
      },
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: ["id", "name", "email", "providers"],
  indexes: ["updatedAt"],
};
