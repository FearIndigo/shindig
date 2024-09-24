<template>
  <EventView v-if="event" :event="event" />
</template>

<script setup lang="ts">
import type { EventCollection } from "~/rxdb/types";

const { id } = defineProps<{ id: string }>();

const query = computed(
  () => (collection: EventCollection) =>
    collection.findOne({
      selector: {
        id,
      },
    })
);

const event = await useRxQuery("events", query);
</script>
