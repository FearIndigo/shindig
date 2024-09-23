<template>
  <p v-if="events.length === 0" class="text-disabled">
    No events to display...
  </p>
  <v-list v-else class="pa-0" lines="three" rounded>
    <template v-for="(event, i) in $props.events" :key="event.id">
      <EventPreview :event="event" />
      <v-divider
        v-if="i < events!.length - 1"
        :key="`${i}-divider`"
      ></v-divider>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";
defineProps<{ events: EventDocument[] }>();
</script>
