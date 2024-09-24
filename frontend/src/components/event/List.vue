<template>
  <p v-if="events.length === 0" class="text-disabled">
    No events to display...
  </p>
  <v-list
    v-else
    class="pa-0"
    lines="three"
    :elevation="$props.elevation"
    variant="elevated"
    rounded
  >
    <template v-for="event in $props.events" :key="event.id">
      <EventPreview :event="event" />
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";
defineProps<{ events: EventDocument[]; elevation?: string }>();
</script>
