import { validate } from "uuid";

export default function isUuid(value: string) {
  return validate(value);
}
