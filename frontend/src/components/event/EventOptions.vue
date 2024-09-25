<template>
  <v-menu v-model="modalOpen">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="flat" icon>
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-tooltip activator="parent">Event options</v-tooltip>
      </v-btn>
    </template>
    <v-list>
      <EventEditDialog :event="event" @on-close="modalOpen = false" />
      <EventDeleteDialog :event="event" />
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

defineProps<{ event: EventDocument }>();

const modalOpen = ref(false);

function closeModal() {
  modalOpen.value = false;
}
</script>
