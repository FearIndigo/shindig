import type { RxCollectionCreator } from "rxdb";
import commentSchema from "../schemas/commentSchema.js";
import type { CommentType } from "../types/schema.js";

const comments = {
  schema: commentSchema,
} satisfies RxCollectionCreator<CommentType>;

export default comments;
