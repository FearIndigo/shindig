<template>
  <NuxtLink :to="`/event/${event.id}`" custom>
    <v-card
      :to="`/event/${event.id}`"
      :title="event.title"
      :subtitle="event.location"
      :text="event.description"
    >
    </v-card>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { EventType } from "~/rxdb/types";

const { event } = defineProps<{
  event: EventType;
}>();
</script>
