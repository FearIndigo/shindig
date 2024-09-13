import type { RxDocument } from "rxdb";
import type {
  CommentType,
  EventType,
  InteractionType,
  ResponseType,
  UserType,
} from "./schema";

export type CommentDocument = RxDocument<CommentType>;
export type EventDocument = RxDocument<EventType>;
export type InteractionDocument = RxDocument<InteractionType>;
export type ResponseDocument = RxDocument<ResponseType>;
export type UserDocument = RxDocument<UserType>;
