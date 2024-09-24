<template>
  <EventView v-if="event" :event="event" />
</template>

<script setup lang="ts">
import type { EventType, EventDocument } from "~/rxdb/types";

const { id } = defineProps<{ id: string }>();

const query = computed(
  () => (collection) =>
    collection.findOne({
      selector: {
        id,
      },
    })
);

const event = await useRxQuery<EventType, EventDocument | null>(
  "events",
  query
);
</script>
