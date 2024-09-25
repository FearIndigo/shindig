<template>
  <v-dialog v-model="modalOpen" max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        prepend-icon="mdi-account-multiple-plus-outline"
      >
        Invite people
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <FormInvitePeopleForm :event="event" @on-close="closeModal" />
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

defineProps<{ event: EventDocument }>();
const emit = defineEmits<{ onClose: [] }>();

const modalOpen = ref(false);

function closeModal() {
  modalOpen.value = false;
  emit("onClose");
}
</script>
