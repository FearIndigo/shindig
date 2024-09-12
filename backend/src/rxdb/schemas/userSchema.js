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
  },
  additionalProperties: false,
  required: ["id", "name", "email"],
};
