<template>
  <div>
    <template v-for="event in events" :key="event.id">
      <EventPreview :event="event" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { EventType, EventDocument } from "~/rxdb/types";

const session = await useSessionData();
const userId = session.passport?.user.id ?? "";

const events = await useRxQuery<EventType, EventDocument[]>(
  "events",
  (collection) =>
    collection.find({
      selector: {
        $or: [
          // Event is public.
          { visibility: "Public" },
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
        ],
      },
    })
);
</script>
