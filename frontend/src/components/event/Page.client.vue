<template>
  <EventView v-if="event" :event="event" />
</template>

<script setup lang="ts">
import type { EventCollection } from "~/rxdb/types";

const props = defineProps<{ id: string }>();

const query = computed(() => {
  // TODO: see if there is a better way to register the dependency.
  const deps = [props.id];
  return (collection: EventCollection) =>
    collection.findOne({
      selector: {
        id: props.id,
      },
    });
});

const event = await useRxQuery("events", query);
</script>
