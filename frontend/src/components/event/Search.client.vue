<template>
  <div>
    <EventList v-if="events" :events="events" elevation="1" />
  </div>
</template>

<script setup lang="ts">
import type { MangoQuerySelector } from "rxdb";
import type { EventType, EventCollection } from "~/rxdb/types";

const props = defineProps<{
  pastEvents?: boolean;
  includePublic?: boolean;
}>();
const session = await useSessionData();

const query = computed(() => {
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

  // Include public events.
  if (props.includePublic) {
    filters.push({ visibility: "Public" });
  }

  // TODO: see if there is a better way to register the dependency.
  const deps = [props.pastEvents];

  // Return generated query builder.
  return (collection: EventCollection) =>
    collection.find({
      selector: {
        $or: filters,
        // Get events from past/future.
        startAt: props.pastEvents ? { $lte: Date.now() } : { $gte: Date.now() },
      },
      // Sort events by starting time.
      sort: [{ startAt: props.pastEvents ? "desc" : "asc" }],
    });
});

const events = await useRxQuery("events", query);
</script>
