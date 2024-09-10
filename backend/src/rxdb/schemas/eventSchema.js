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
    name: {
      type: "string",
    },
    description: {
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
  required: ["id", "name"],
};
