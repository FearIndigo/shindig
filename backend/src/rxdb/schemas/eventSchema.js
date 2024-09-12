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
    userId: {
      type: "string",
      ref: "users",
      format: "uuid",
    },
    title: {
      type: "string",
    },
    startAt: {
      type: "string",
      format: "date-time",
    },
    duration: {
      type: "string",
      format: "duration",
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
  },
  additionalProperties: false,
  required: ["id", "userId", "title"],
};
