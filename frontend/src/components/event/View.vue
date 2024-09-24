<template>
  <div class="d-flex flex-column ga-6">
    <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="1" rounded>
      <div>
        <p class="text-caption text-disabled">{{ timeText }}</p>

        <h2>{{ event.title }}</h2>

        <p>{{ event.location }}</p>
      </div>

      <v-divider></v-divider>

      <div>
        <h3>Details</h3>

        <p>
          {{ event.description }}
        </p>
      </div>
    </v-sheet>

    <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="1" rounded>
      <h3>Comments</h3>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

const { event } = defineProps<{
  event: EventDocument;
}>();

const timeText = getEventTimeText(event);
</script>
