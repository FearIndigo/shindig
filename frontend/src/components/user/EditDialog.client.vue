<template>
  <v-dialog v-model="modalOpen" max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" prepend-icon="mdi-pencil-outline">
        Edit user
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <FormEditUserForm :edit-user="user" @submit="closeModal" />
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";

defineProps<{ user: UserDocument }>();
const emit = defineEmits<{ onClose: [] }>();

const modalOpen = ref(false);

function closeModal() {
  modalOpen.value = false;
  emit("onClose");
}
</script>
