<template>
  <v-list-item class="px-6">
    <div class="d-flex ga-2">
      <v-icon icon="mdi-timer-outline"></v-icon>
      <span>{{ durationText }}</span>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import { formatDistanceStrict } from "date-fns";
import type { EventDocument } from "~/rxdb/types";

const props = defineProps<{ event: EventDocument }>();

const durationText = computed(() =>
  formatDistanceStrict(
    new Date(props.event.startAt + props.event.duration),
    new Date(props.event.startAt)
  )
);
</script>
