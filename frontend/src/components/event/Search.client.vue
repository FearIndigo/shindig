<template>
  <div>
    <EventList v-if="events" :events="events" elevation="1" />
  </div>
</template>

<script setup lang="ts">
import type { MangoQuerySelector } from "rxdb";
import type { EventType, EventDocument } from "~/rxdb/types";

const props = defineProps<{
  pastEvents?: boolean;
  includePublic?: boolean;
}>();
const session = await useSessionData();
const userId = session.passport?.user.id ?? "";

const filters: MangoQuerySelector<EventType>[] = [
  // User is invited.
  {
    responses: {
      $elemMatch: {
        userId,
      },
    },
  },
  // User is a host.
  { hosts: { $in: [userId] } },
];

if (props.includePublic) {
  filters.push({ visibility: "Public" });
}

const events = await useRxQuery<EventType, EventDocument[]>(
  "events",
  (collection) =>
    collection.find({
      selector: {
        $or: filters,
        // Get events from past/future.
        startAt: props.pastEvents ? { $lte: Date.now() } : { $gte: Date.now() },
      },
      // Sort events by starting time.
      sort: [{ startAt: props.pastEvents ? "desc" : "asc" }],
    })
);
</script>
