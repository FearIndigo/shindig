<template>
  <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="4" rounded>
    <div class="d-flex align-center ga-2">
      <v-icon icon="mdi-pencil-outline"></v-icon>
      <h4 class="text-h5">Edit User</h4>
    </div>

    <v-divider></v-divider>

    <v-form
      @submit.prevent="submit"
      v-model="valid"
      class="d-flex flex-column ga-6"
    >
      <v-text-field v-model="name" label="Name" :rules="[formRules.required]" />

      <v-divider></v-divider>

      <v-btn type="submit" color="primary">Edit User</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";

const props = defineProps<{ editUser: UserDocument }>();
const emit = defineEmits<{
  submit: [];
}>();

const valid = ref();
const name = ref(props.editUser.name);

const session = await useSessionData();
if (props.editUser.id != session.passport?.user.id) {
  throw createError({
    statusCode: 401,
    statusMessage:
      "Unauthorized: You can only edit the user you are logged in as!",
  });
}

async function submit() {
  if (!valid.value) return;

  // Update user
  await props.editUser.patch({
    name: name.value,
  });

  emit("submit");
}
</script>
