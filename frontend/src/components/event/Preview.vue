<template>
  <NuxtLink :to="`/event/${event.id}`" custom>
    <v-list-item :to="`/event/${event.id}`">
      <v-list-item-subtitle class="text-caption text-disabled">
        {{ timeText }}
      </v-list-item-subtitle>
      <v-list-item-title>{{ event.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ event.location }}</v-list-item-subtitle>
    </v-list-item>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { EventType } from "~/rxdb/types";

const props = defineProps<{
  event: EventType;
}>();

const timeText = computed(() => getEventTimeText(props.event));
</script>
