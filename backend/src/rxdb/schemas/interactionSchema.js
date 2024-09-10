export default {
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
      enum: ["like", "heart", "laugh", "sad", "cry"],
      default: "like",
    },
  },
  additionalProperties: false,
  required: ["id", "userId", "type"],
};
