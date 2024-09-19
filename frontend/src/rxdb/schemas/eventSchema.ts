import type { JSONSchema } from "json-schema-to-ts";

const eventSchema = {
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
      type: "number",
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
      items: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            ref: "users",
            format: "uuid",
          },
          type: {
            type: "string",
            enum: ["Invited", "Maybe", "Going", "Can't go"],
          },
        },
        additionalProperties: false,
        required: ["userId", "type"],
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
    visibility: {
      type: "string",
      enum: ["Private", "Public", "Friends"],
    },
    updatedAt: {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
      multipleOf: 1,
    },
  },
  additionalProperties: false,
  required: [
    "id",
    "hosts",
    "title",
    "startAt",
    "duration",
    "location",
    "description",
    "responses",
    "interactions",
    "comments",
    "visibility",
  ],
  indexes: ["updatedAt"],
} as const satisfies JSONSchema & Record<string, unknown>;

export default eventSchema;
