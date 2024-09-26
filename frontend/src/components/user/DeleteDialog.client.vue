<template>
  <v-dialog v-model="modalOpen" max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" prepend-icon="mdi-delete-outline">
        Delete user
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Delete User" prepend-icon="mdi-delete-outline">
        <template v-slot:text>
          <p>Are you sure you want to permantly delete this user?</p>
        </template>

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn color="error" @click="deleteUser"> Delete </v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";

const props = defineProps<{ user: UserDocument }>();
const emit = defineEmits<{ onClose: [] }>();

const modalOpen = ref(false);

function closeModal() {
  modalOpen.value = false;
  emit("onClose");
}

async function deleteUser() {
  // Remove user.
  await props.user.remove();

  // Logout. (Doing it this way because there were CORS issues with the redirect when using fetch api)
  const config = useRuntimeConfig();
  const form = document.createElement("form");
  form.method = "post";
  form.action = config.public.apiBase + "/auth/logout";
  document.body.appendChild(form);
  form.submit();
}
</script>
