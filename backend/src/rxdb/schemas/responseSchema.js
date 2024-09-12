export default {
  title: "response schema",
  version: 0,
  description: "describes a response",
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
      enum: ["invited", "maybe", "going", "notGoing"],
      default: "invited",
    },
  },
  additionalProperties: false,
  required: ["id", "userId"],
};
