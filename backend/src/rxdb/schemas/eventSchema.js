export default {
  title: "event schema",
  version: 0,
  description: "describes an event",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      format: "uuid",
    },
    hosts: {
      type: "array",
      ref: "users",
      items: {
        type: "string",
        format: "uuid",
      },
    },
    title: {
      type: "string",
    },
    startAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
    duration: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
    location: {
      type: "string",
    },
    description: {
      type: "string",
    },
    responses: {
      type: "array",
      ref: "responses",
      items: {
        type: "string",
        format: "uuid",
      },
    },
    interactions: {
      type: "array",
      ref: "interactions",
      items: {
        type: "string",
        format: "uuid",
      },
    },
    comments: {
      type: "array",
      ref: "comments",
      items: {
        type: "string",
        format: "uuid",
      },
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
    private: {
      type: "boolean",
      default: false,
    },
  },
  additionalProperties: false,
  required: ["id", "hosts", "title"],
  indexes: ["updatedAt"],
};
