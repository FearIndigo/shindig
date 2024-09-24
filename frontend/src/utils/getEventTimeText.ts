import { format, formatDistanceStrict } from "date-fns";
import type { EventType } from "~/rxdb/types";

export default function getEventTimeText(event: EventType) {
  const from = new Date(event.startAt);
  const start = format(from, "iii, d MMM 'at' p");
  if (event.duration === 0) {
    return start;
  }

  const to = new Date(event.startAt + event.duration);
  return `${start}, for ${formatDistanceStrict(from, to)}`;
}
