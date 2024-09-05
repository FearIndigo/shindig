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
    userId: {
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
  },
  additionalProperties: false,
  required: ["id", "userId", "message"],
};
