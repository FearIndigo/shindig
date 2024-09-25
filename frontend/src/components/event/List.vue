<template>
  <p v-if="events.length === 0" class="text-disabled">
    No events to display...
  </p>
  <v-list
    v-else
    class="pa-0"
    lines="three"
    :elevation="$props.elevation"
    rounded
  >
    <template v-for="(event, i) in $props.events" :key="event.id">
      <EventPreview :event="event" />
      <v-divider v-if="i < $props.events.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";
defineProps<{ events: EventDocument[]; elevation?: string }>();
</script>
