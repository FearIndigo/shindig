<template>
  <EventView v-if="event" :event="event" />
</template>

<script setup lang="ts">
import type { EventType, EventDocument } from "~/rxdb/types";

const { id } = defineProps<{ id: string }>();

const event = await useRxQuery<EventType, EventDocument | null>(
  "events",
  (collection) =>
    collection.findOne({
      selector: {
        id,
      },
    })
);
</script>
