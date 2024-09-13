import type { RxCollectionCreator } from "rxdb";
import userSchema from "../schemas/userSchema.js";
import type { UserType } from "../types/schema.js";

const users = {
  schema: userSchema,
} satisfies RxCollectionCreator<UserType>;

export default users;
