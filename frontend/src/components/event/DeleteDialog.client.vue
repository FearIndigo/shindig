<template>
  <v-dialog max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" prepend-icon="mdi-delete-outline">
        Delete event
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Delete Event" prepend-icon="mdi-delete-outline">
        <template v-slot:text>
          <p>Are you sure you want to permantly delete this event?</p>
        </template>

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn color="error" @click="deleteEvent"> Delete </v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

const props = defineProps<{ event: EventDocument }>();
const emit = defineEmits<{ onClose: [] }>();

const modalOpen = ref(false);

function closeModal() {
  modalOpen.value = false;
  emit("onClose");
}

async function deleteEvent() {
  await props.event.remove();
  navigateTo("/");
}
</script>
