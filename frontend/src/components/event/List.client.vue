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
          { private: false },
          { responses: { $in: [userId] } }, // Might need to denormalise responses for this to work.
          { hosts: { $in: [userId] } },
        ],
      },
    })
);
</script>
