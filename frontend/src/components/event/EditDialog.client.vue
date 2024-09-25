<template>
  <v-dialog v-model="modalOpen" max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" prepend-icon="mdi-pencil-outline">
        Edit event
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <FormCreateEventForm :edit-event="event" @submit="closeModal" />
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { EventType } from "~/rxdb/types";

defineProps<{ event: EventType }>();
const emit = defineEmits<{ onClose: [] }>();

const modalOpen = ref(false);

function closeModal() {
  modalOpen.value = false;
  emit("onClose");
}
</script>
