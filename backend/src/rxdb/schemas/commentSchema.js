export default {
  title: "comment schema",
  version: 0,
  description: "describes a comment",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      format: "uuid",
    },
    authorId: {
      type: "string",
      ref: "users",
      format: "uuid",
    },
    message: {
      type: "string",
    },
    interactions: {
      type: "array",
      ref: "interactions",
      items: {
        type: "string",
        format: "uuid",
      },
    },
    createdAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
      final: true,
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: ["id", "authorId", "message", "interactions", "createdAt"],
  indexes: ["updatedAt"],
};
