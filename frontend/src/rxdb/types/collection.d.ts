import type { RxCollection } from "rxdb";
import type {
  CommentType,
  EventType,
  InteractionType,
  ResponseType,
  UserType,
} from "./schema";

export type CommentCollection = RxCollection<CommentType>;
export type EventCollection = RxCollection<EventType>;
export type InteractionCollection = RxCollection<InteractionType>;
export type ResponseCollection = RxCollection<ResponseType>;
export type UserCollection = RxCollection<UserType>;

export type DatabaseCollections = {
  comments: CommentCollection;
  events: EventCollection;
  interactions: InteractionCollection;
  responses: ResponseCollection;
  users: UserCollection;
};
