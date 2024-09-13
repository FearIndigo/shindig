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
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: ["id", "userId"],
  indexes: ["updatedAt"],
};
