import type { RxCollectionCreator } from "rxdb";
import responseSchema from "../schemas/responseSchema.js";
import type { ResponseType } from "../types/schema.js";

const responses = {
  schema: responseSchema,
} satisfies RxCollectionCreator<ResponseType>;

export default responses;
