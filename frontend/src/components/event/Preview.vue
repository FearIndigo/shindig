<template>
  <NuxtLink :to="`/event/${event.id}`" custom>
    <v-list-item :to="`/event/${event.id}`">
      <v-list-item-subtitle class="text-caption text-disabled">
        {{ timeText }}
      </v-list-item-subtitle>
      <v-list-item-title>{{ event.title }}</v-list-item-title>
      <v-list-item-subtitle>{{
        event.location ? event.location : "..."
      }}</v-list-item-subtitle>
    </v-list-item>
  </NuxtLink>
</template>

<script setup lang="ts">
import { format, formatDistanceStrict } from "date-fns";
import type { EventType } from "~/rxdb/types";

const { event } = defineProps<{
  event: EventType;
}>();

const timeText = computed(() => {
  const from = new Date(event.startAt);
  const start = format(from, "iii, d MMM 'at' p");
  if (event.duration === 0) {
    return start;
  }

  const to = new Date(event.startAt + event.duration);
  return `${start}, for ${formatDistanceStrict(from, to)}`;
});
</script>
